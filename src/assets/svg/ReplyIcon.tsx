import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const ReplyIcon = ({
  width = 17,
  height = 16,
  color = colorsLight.GRAY_03,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 16" fill="none">
      <G id="Forward" clipPath="url(#clip0_140_7282)">
        <Path
          id="Vector"
          d="M7.11333 9.69333V12.0467L2.5 7.47334L7.11333 3V5.5C10.7267 5.5 14.5 6.47333 14.5 10.4267V13C12.6667 9.41333 8 9.53333 7.22666 9.58C7.16 9.58 7.11999 9.63334 7.11999 9.7L7.11333 9.69333Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_140_7282">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="matrix(-1 0 0 1 16.5 0)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
