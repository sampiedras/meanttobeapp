// import {v4 as uuidv4} from 'uuid';
import {Storage} from 'aws-amplify';
const Buffer = require('buffer').Buffer;

export type StorageAccessLevel = 'public' | 'protected' | 'private';

export const useUploadImageToS3 = () => {
  const handleUpload = async (
    name: string,
    type: string,
    base64: string,
    level: StorageAccessLevel,
  ) => {
    try {
      const blob = Buffer.from(base64, 'base64');

      await Storage.put(
        // `${uuidv4()}.${image.assets[0].type.split('/')[1]}`,
        name,
        blob,
        {
          level,
          contentType: type,
        },
      );
    } catch (error) {}
  };

  return {handleUpload};
};
