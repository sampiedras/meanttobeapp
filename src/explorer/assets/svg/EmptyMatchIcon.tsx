import React from "react";
import Svg, { G, Rect } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

export const EmptyMatchIcon = ({ width = 215, height = 249 }: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 215 249" fill="none">
      <G>
        <Rect
          x="55.0215"
          y="35.9678"
          width="105.847"
          height="107.471"
          rx="13.5"
          fill="#EAEDF0"
        />
      </G>
      <Rect
        opacity="0.3"
        x="55"
        y="155"
        width="106"
        height="16"
        rx="8"
        fill="#BAC2CC"
      />
      <Rect
        opacity="0.3"
        x="54"
        y="181"
        width="106"
        height="15"
        rx="7.5"
        fill="#BAC2CC"
      />
    </Svg>
  );
};
