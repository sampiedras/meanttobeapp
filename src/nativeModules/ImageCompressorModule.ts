import {NativeModules} from 'react-native';

const {ImageCompressorModule} = NativeModules;

interface IImageCompressorModule {
  compressImageFromBase64(
    base64Str: string,
    maxWidth: number,
    maxHeight: number,
  ): void;
}

export default ImageCompressorModule as IImageCompressorModule;
