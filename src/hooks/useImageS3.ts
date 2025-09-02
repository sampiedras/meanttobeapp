import {Storage} from 'aws-amplify';

export const useImageS3 = () => {
  const getSignedURL = async (image: any) => {
    const signedURL = await Storage.get(image);
    return signedURL;
  };
  return {getSignedURL};
};
