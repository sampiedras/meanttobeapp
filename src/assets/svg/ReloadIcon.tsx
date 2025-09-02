import React from 'react';
import Svg, {G, Path, Defs, Rect, ClipPath} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const ReloadIcon = ({
  width = 18,
  height = 18,
  color = '#4E6B51',
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_502_10229)">
        <Path
          d="M0.948975 2.87183V6.71798H4.79513"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.55795 9.92314C2.97359 11.1029 3.76137 12.1156 4.8026 12.8086C5.84383 13.5017 7.0821 13.8376 8.33084 13.7658C9.57958 13.6939 10.7711 13.2181 11.726 12.4102C12.6808 11.6022 13.3472 10.5058 13.6248 9.2862C13.9023 8.06657 13.776 6.78978 13.2648 5.64821C12.7536 4.50663 11.8852 3.56212 10.7905 2.95697C9.69586 2.35182 8.43417 2.11883 7.19556 2.29309C5.95696 2.46736 4.80853 3.03944 3.92333 3.92314L0.948975 6.71802"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_502_10229">
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
