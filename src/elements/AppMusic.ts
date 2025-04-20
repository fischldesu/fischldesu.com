
export default function AppMusic() {
  return {
    get Element() {
      let music = document.getElementById('app-music') as HTMLAudioElement;
      if (!music){
          music = document.createElement<'audio'>('audio');
          music.id = 'app-music';
          const mainElement = document.getElementById('app-main');
      if (mainElement)
        mainElement.insertBefore(document.getElementById('') as HTMLElement, music);
      }
      return music;
    }
  };
}
