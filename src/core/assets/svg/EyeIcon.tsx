import React from "react";
import Svg, { Path } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const EyeIcon = ({
  width = 16,
  height = 16,
  color = colorsLight.SECONDARY_TEXT_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M0.666748 8C0.666748 8 3.33342 2.66667 8.00008 2.66667C12.6668 2.66667 15.3334 8 15.3334 8C15.3334 8 12.6668 13.3333 8.00008 13.3333C3.33342 13.3333 0.666748 8 0.666748 8Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
