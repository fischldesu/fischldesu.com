import { reactive } from "vue";
import { ShuffleArray } from "@/util";

export interface MusicMetaData {
  src: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
}

class MusicMetaDataReader {
  async read(url:string):Promise<MusicMetaData | null> {
    try {
      const response = await fetch(url);
      if (!response.ok)
        return null;

      const dataView = new DataView(await response.arrayBuffer());
      if (!this.isMP3type(dataView))
        return null;
      const parsed = this.parseMetaData(dataView);
      if (parsed) {
        parsed.src = url;
        return parsed;
      }
      console.warn('Parse Music MetaData failed');
      return null;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  isMP3type(dataView: DataView):boolean {
    return String.fromCharCode(
      dataView.getUint8(0),
      dataView.getUint8(1),
      dataView.getUint8(2)) === 'ID3';
  }

  private parseMetaData(DataView: DataView): MusicMetaData | null {
    const id3v2 = this.parseID3v2(DataView);
    if (id3v2)
      return id3v2;

    console.log('Parse ID3v2 failed, trying ID3v1');
    return this.parseID3v1(DataView);
  }

  private parseID3v1(dataView: DataView): MusicMetaData | null {
    const fileSize = dataView.byteLength;
    if (fileSize < 128)
      return null;

    const tagOffset = fileSize - 128;
    const tagIdentifier = this.BytesToString(dataView, tagOffset, 3);
    if (tagIdentifier !== 'TAG')
      return null;

    const title = this.BytesToString(dataView, tagOffset + 3, 30).trim();
    const artist = this.BytesToString(dataView, tagOffset + 33, 30).trim();
    const album = this.BytesToString(dataView, tagOffset + 63, 30).trim();
    // const year = this.BytesToString(dataView, tagOffset + 93, 4).trim();

    return {
      src: '',
      title: title,
      artist: artist,
      album: album,
      cover: ''
    }

  }

  private parseID3v2(dataView: DataView): MusicMetaData | null {
    const size =
      (dataView.getUint8(6) << 21) |
      (dataView.getUint8(7) << 14) |
      (dataView.getUint8(8) << 7) |
      dataView.getUint8(9);

    let title = '';
    let artist = '';
    let album = '';
    let offset = 10;
    const end = Math.min(offset + size, dataView.byteLength);
    while (offset < end - 10) {
      const frameID = this.BytesToString(dataView, offset, 4);
      if (frameID === '\0\0\0\0')
        break;

      const frameSize = dataView.getUint32(offset + 4, false);
      if (frameSize === 0 || offset + 10 + frameSize > end)
        break;

      const metadata = this.readFrameData(dataView, offset + 10, frameSize);
      switch (frameID) {
        case 'TIT2': // Title
          title = metadata;
          break;
        case 'TPE1': // Artist
          artist = metadata;
          break;
        case 'TALB': // Album
          album = metadata;
          break;
      }
      offset += 10 + frameSize;
    }
    if (title == '')
      return null

    return {
      src: '',
      title: title,
      artist: artist,
      album: album,
      cover: ''
    }
  }

  private BytesToString(dataView:DataView, offset:number, length:number) {
    let str = '';
    for (let i = 0; i < length; i++) {
      const byte = dataView.getUint8(offset + i);
      if (byte === 0) break;
      str += String.fromCharCode(byte);
    }
    return str;
  }

  private readFrameData(dataView:DataView, offset:number, size:number) {
    if (size === 0) return '';

    const encoding = dataView.getUint8(offset);
    let text:string;

    switch (encoding) {
      case 0: // ISO-8859-1
        text = this.BytesToString(dataView, offset + 1, size - 1);
        break;
      case 1: // UTF-16 with BOM
        text = this.getUTF16String(dataView, offset + 1, size - 1);
        break;
      case 2: // UTF-16BE
        text = this.getUTF16String(dataView, offset + 1, size - 1, false);
        break;
      case 3: // UTF-8
        text = this.getUTF8String(dataView, offset + 1, size - 1);
        break;
      default:
        text = this.BytesToString(dataView, offset + 1, size - 1);
    }

    return text.replace(/\0/g, '').trim();
  }

  private getUTF16String(dataView:DataView, offset:number, length:number, littleEndian = true) {
    const bytes = new Uint8Array(dataView.buffer, offset, length);
    return new TextDecoder(littleEndian ? 'utf-16le' : 'utf-16be').decode(bytes);
  }

  private getUTF8String(dataView:DataView, offset:number, length:number) {
    const bytes = new Uint8Array(dataView.buffer, offset, length);
    return new TextDecoder('utf-8').decode(bytes);
  }

}

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
  private historyStack = new Array<MusicMetaData>;
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

      musicMetaDataReader.read(src).then(metaData => {
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
const musicMetaDataReader = new MusicMetaDataReader();

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
