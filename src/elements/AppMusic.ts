export default function AppMusic():HTMLAudioElement {
  let ele = document.getElementById('app-music') as HTMLAudioElement;
  if (!ele){
    ele = document.createElement('audio');
    ele.id = 'app-music';
    const mainElement = document.getElementById('app-main');
    if (mainElement)
      mainElement.appendChild(ele);
  }
  return ele;
}
