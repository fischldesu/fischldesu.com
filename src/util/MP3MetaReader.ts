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

  private BytesToUTF16(dataView:DataView, offset:number, length:number, littleEndian = true) {
    const bytes = new Uint8Array(dataView.buffer, offset, length);
    return new TextDecoder(littleEndian ? 'utf-16le' : 'utf-16be').decode(bytes);
  }

  private BytesToUTF8(dataView:DataView, offset:number, length:number) {
    const bytes = new Uint8Array(dataView.buffer, offset, length);
    return new TextDecoder('utf-8').decode(bytes);
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
        text = this.BytesToUTF16(dataView, offset + 1, size - 1);
        break;
      case 2: // UTF-16BE
        text = this.BytesToUTF16(dataView, offset + 1, size - 1, false);
        break;
      case 3: // UTF-8
        text = this.BytesToUTF8(dataView, offset + 1, size - 1);
        break;
      default:
        text = this.BytesToString(dataView, offset + 1, size - 1);
    }

    return text.replace(/\0/g, '').trim();
  }

}

const instance = new MusicMetaDataReader();
export default instance;
