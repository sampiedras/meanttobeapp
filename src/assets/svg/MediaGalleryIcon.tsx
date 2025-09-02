import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const MediaGalleryIcon = ({width = 24, height = 24}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G id="Media">
        <Mask
          id="mask0_26_6204"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}>
          <Rect
            id="Bounding box"
            width={width}
            height={height}
            fill="#D9D9D9"
          />
        </Mask>
        <G mask="url(#mask0_26_6204)">
          <Path
            id="image"
            d="M5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5ZM5 19H19V5H5V19ZM6 17H18L14.25 12L11.25 16L9 13L6 17Z"
            fill="#708873"
          />
        </G>
      </G>
    </Svg>
  );
};
