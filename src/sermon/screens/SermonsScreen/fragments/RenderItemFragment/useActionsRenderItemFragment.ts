import { useCallback, useState } from "react";
import {
  useCreateSermonLikeMutation,
  useDeleteSermonLikeMutation,
} from "@/sermon/data/remote/sermonApi";

export const useActionsRenderItemFragment = (
  sermonId: string,
  isLike: boolean,
) => {
  const [createSermonLike] = useCreateSermonLikeMutation();
  const [deleteSermonLike] = useDeleteSermonLikeMutation();

  const [like, setLike] = useState<boolean>(isLike);

  const handleToggleLike = useCallback(async () => {
    setLike((prevLike) => !prevLike);

    if (like) {
      await deleteSermonLike(sermonId);
    } else {
      await createSermonLike(sermonId);
    }
  }, [createSermonLike, deleteSermonLike, like, sermonId]);

  return {
    like,
    handleToggleLike,
  };
};
