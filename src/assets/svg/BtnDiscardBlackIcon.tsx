import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const BtnDiscardBlackIcon = ({
  width = 53,
  height = 52,
  color = colorsLight.BLACK,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 53 52" fill="none">
      <Circle cx="26.4727" cy="26" r="26" fill={color} />
      <Path
        d="M32.4727 20L20.4727 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.4727 20L32.4727 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
