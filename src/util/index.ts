import musicMetaReader, { type MusicMetaData } from './MP3MetaReader';

function ShuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换元素
  }
  return arr;
}

export {
  musicMetaReader,
  ShuffleArray
};

export type {
  MusicMetaData
}
