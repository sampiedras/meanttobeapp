import { useCallback } from "react";
import { Alert } from "react-native";
import * as Sentry from "@sentry/react-native";
import { MediaBodyEntity } from "../data/remote/entities/mediaEntity";
import {
  useGetUrlMediaMutation,
  usePutMediaMutation,
} from "../data/remote/mediaApi";

export const useUploadImage = () => {
  const [handleGetUrlMedia] = useGetUrlMediaMutation();
  const [handlePutMedia] = usePutMediaMutation();

  const handleUpload = useCallback(
    async (data: MediaBodyEntity, base64: string) => {
      try {
        const resultUrl = await handleGetUrlMedia(data).unwrap();
        await handlePutMedia({
          url: resultUrl.put_url,
          file: base64,
          headers: {
            "Content-Type": data.type,
          },
        }).unwrap();
        return resultUrl.resource_url;
      } catch (error: any) {
        Sentry.captureException("Error - handleUpload", error);
        Alert.alert(`Error to upload file: ${data.name}`, error.message);
        throw new Error(error);
      }
    },
    [handleGetUrlMedia, handlePutMedia],
  );
  return { handleUpload };
};
