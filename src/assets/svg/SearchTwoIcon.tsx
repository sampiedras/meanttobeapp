import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {G, Path, Defs, Rect, ClipPath} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const SearchTwoIcon = ({
  width = 24,
  height = 24,
  color = colorsLight.BLACK,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1_4731)">
        <Path
          d="M11.74 20.48C16.567 20.48 20.48 16.567 20.48 11.74C20.48 6.91303 16.567 3 11.74 3C6.91303 3 3 6.91303 3 11.74C3 16.567 6.91303 20.48 11.74 20.48Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <Path
          d="M18.03 18.0298L21 20.9998"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_4731">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
