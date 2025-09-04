import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import {
  useCreateQuizLikeMutation,
  useDeleteQuizLikeMutation,
} from "@/quiz/data/remote/quizApi";

export const useActionsCard = (
  quizId: string,
  isLike: boolean,
  removeItem: () => void,
) => {
  const [createQuizLike] = useCreateQuizLikeMutation();
  const [deleteQuizLike] = useDeleteQuizLikeMutation();

  const [like, setLike] = useState<boolean>(isLike);

  const { width } = useWindowDimensions();

  const handleToggleLike = useCallback(async () => {
    setLike((prevLike) => !prevLike);

    if (like) {
      await deleteQuizLike(quizId);
    } else {
      await createQuizLike(quizId);
    }
  }, [createQuizLike, deleteQuizLike, like, quizId]);

  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const rotate = pan.current.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ["40deg", "0deg", "-40deg"],
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: Animated.event([null, { dx: pan.current.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_e, g) => {
      if (Math.abs(g.vx) > 1 || Math.abs(g.dx) > width / 5) {
        Animated.spring(pan.current, {
          toValue: { x: width * 2 * (g.dx < 0 ? -1 : 1), y: 0 },
          useNativeDriver: true,
          bounciness: 0,
        }).start();
        setTimeout(() => {
          Animated.spring(pan.current, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 10,
          }).start();
          removeItem();
        }, 200);
      } else {
        Animated.spring(pan.current, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(pan.current, {
        toValue: { x: 40, y: 0 },
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    }, 400);

    setTimeout(() => {
      Animated.spring(pan.current, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        bounciness: 10,
      }).start();
    }, 1200);
  }, []);

  return {
    like,
    pan,
    rotate,
    panResponder,
    handleToggleLike,
  };
};
