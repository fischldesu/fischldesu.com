import { reactive } from "vue";
import { ShuffleArray, musicMetaReader, type MusicMetaData } from "@/util";

export enum MusicPlayType {
  None,         // 单曲播放
  repeatQueue,  // 列表循环
  repeatSingle, // 单曲循环
  queued,       // 队列播放
  shuffle,      // 随机播放
}

class AppMusicData {
  readonly element: HTMLAudioElement;

  private musicPlayType: MusicPlayType = MusicPlayType.queued;
  private readonly historyStack = new Array<MusicMetaData>;
  private readonly queue = reactive(new Array<MusicMetaData>);
  private sourceQueue= new Array<MusicMetaData>();

  private set meta (src:string) {
    this.element.src = src;
    this.element.load();
  }

  constructor() {
    this.element = document.createElement('audio') as HTMLAudioElement;
    //Auto next
    this.element.addEventListener('ended', ()=>{
      if (this.musicPlayType !== MusicPlayType.None)
        this.Next();
    });
  }

  Next() {
    const PushHistory = ()=>{
      const last = this.historyStack[this.historyStack.length - 1];
      const current = this.queue.shift();
      if (current && last?.src !== current.src)
        this.historyStack.push(current);
    }

    if (this.element.src !== encodeURI(this.queue[0].src))
      return this.Play();

    switch (this.musicPlayType) {
      case MusicPlayType.repeatSingle:
        this.meta = this.queue[0].src;
        return this.element.play();
      case MusicPlayType.repeatQueue:
      case MusicPlayType.shuffle:
        PushHistory();
        if (this.queue.length == 0) {
          if (this.musicPlayType == MusicPlayType.shuffle)
            ShuffleArray(this.sourceQueue).forEach(item=>this.queue.push(item))
          else
            this.sourceQueue.forEach(item=>this.queue.push(item));
        }
        this.meta = this.queue[0].src;
        return this.element.play();
      case MusicPlayType.None:
      case MusicPlayType.queued:
        PushHistory();
        if (this.queue.length > 0) {
          this.meta = this.queue[0].src;
          return this.element.play();
        } else {
          return null
        }
    }
  }

  Previous() {
    const last = this.historyStack.pop();
    if (last) {
      this.queue.unshift(last);
      this.meta = last.src;
      return this.element.play();
    } else {
      console.warn('No previous music found');
      return null;
    }
  }

  Play() {
    if (this.element.src !== encodeURI(this.queue[0].src))
      this.meta = this.queue[0].src;
    return this.element.play();
  }

  set playlist(newVal: string[]) {
    //maybe a bug for multiple times of setting playlist
    this.sourceQueue.length = 0;
    this.queue.length = 0;
    newVal.forEach(src=>{
      const title = src.match(/\/([^\/]+)\.([^.]+)$/)?.[1] || 'Unknown';
      const item = reactive<MusicMetaData>({
        src: src,
        title: title,
        artist: '...',
        album: '...',
        cover: '...'
      });

      musicMetaReader.read(src).then(metaData => {
        if (metaData) {
          item.title = metaData.title;
          item.artist = metaData.artist;
          item.album = metaData.album;
          item.cover = metaData.cover;
        }
      }).catch(()=> console.warn('Failed to read music metadata:', src));
      this.sourceQueue.push(item);
      this.queue.push(item);
    })
  }

  get playlist():MusicMetaData[] {
    return this.queue;
  }

}

const appMusic:AppMusicData = new AppMusicData();

export default function AppMusic() {
  return {
    next: () => appMusic.Next(),
    previous: () => appMusic.Previous(),
    play: () => appMusic.Play(),
    pause: () => appMusic.element.pause(),
    get source() {
      return appMusic;
    },
    get element() {
      return appMusic.element;
    },
    get paused() {
      return appMusic.element.paused;
    }
  };
}
