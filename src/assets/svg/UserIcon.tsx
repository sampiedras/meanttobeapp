import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {G, Path, Defs, Rect, ClipPath} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const UserIcon = ({
  width = 18,
  height = 18,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
      <G clip-path="url(#clip0_212_15850)">
        <Path
          d="M7.99998 9.7C10.04 9.7 11.6933 8.08667 11.6933 6.1C11.6933 4.11333 10.04 2.5 7.99998 2.5C5.95998 2.5 4.30664 4.11333 4.30664 6.1C4.30664 8.08667 5.95998 9.7 7.99998 9.7Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4 14.5C5.79333 11.5533 10.16 11.54 11.98 14.4666L12 14.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_15850">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
