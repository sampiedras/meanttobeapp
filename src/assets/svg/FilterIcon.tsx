import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {G, Path, Defs, Rect, ClipPath} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const FilterIcon = ({
  width = 18,
  height = 18,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_502_10217)">
        <Path
          d="M13.1284 13.7693V10.5641"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.2053 10.5641H15.0515"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.87207 13.7693V9.2821"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0.948975 9.2821H4.79513"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.00024 13.7693V8.00006"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.07715 5.43597H9.9233"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.1284 8.00007V2.23083"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.00024 5.43596V2.23083"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.87207 6.71802V2.23083"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_502_10217">
          <Rect
            width="15.3846"
            height="15.3846"
            fill="white"
            transform="translate(0.307861 0.307739)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
