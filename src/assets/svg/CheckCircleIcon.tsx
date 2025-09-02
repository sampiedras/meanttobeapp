import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const CheckCircleIcon = ({
  width = 16,
  height = 16,
  color = colorsLight.NEUTRAL_50,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_92_9596)">
        <Path
          d="M14.6673 7.38662V7.99995C14.6665 9.43757 14.201 10.8364 13.3402 11.9878C12.4794 13.1393 11.2695 13.9816 9.89089 14.3892C8.51227 14.7968 7.03882 14.7479 5.6903 14.2497C4.34177 13.7515 3.19042 12.8307 2.40796 11.6247C1.6255 10.4186 1.25385 8.99199 1.34844 7.55749C1.44303 6.12299 1.99879 4.7575 2.93284 3.66467C3.86689 2.57183 5.12917 1.81021 6.53144 1.49338C7.93371 1.17656 9.40083 1.32151 10.714 1.90662"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.6667 2.66663L8 9.33996L6 7.33996"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_92_9596">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
