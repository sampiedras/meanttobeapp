import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const DeleteRedIcon = ({
  width = 14,
  height = 14,
  color = colorsLight.ERROR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <G id="Group">
        <Path
          id="Vector"
          d="M2.39258 5.23331L3.61922 11.96C3.72589 12.56 4.25255 13 4.86589 13H9.1259C9.73923 13 10.2659 12.5666 10.3726 11.96L11.5992 5.23331"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          id="Vector_2"
          d="M1.01953 3.12H13.0195"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          id="Vector_3"
          d="M3.8125 3.11999L4.79252 1.33332C4.90585 1.13332 5.1192 1.00665 5.34587 1.00665H8.65251C8.88584 1.00665 9.09918 1.13332 9.20585 1.33332L10.1859 3.11999"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          id="Vector_4"
          d="M8.34017 7.66666H5.66016"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};
