import {useEffect, useRef} from 'react';

export const useCombinedRefs = (...refs: any) => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref: any) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};
