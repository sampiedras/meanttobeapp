import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const IconSelectImageTwo = ({
  width = 101,
  height = 101,
  color = colorsLight.DISABLED_TEXT_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 101 101" fill="none">
      <Rect
        x="0.5"
        y="0.5"
        width="100"
        height="100"
        rx="15.5"
        fill="white"
        stroke={color}
        strokeDasharray="2 2"
      />
      <Path
        d="M58.5 52.2475H52.25V58.4975C52.25 58.829 52.1183 59.147 51.8839 59.3814C51.6495 59.6158 51.3315 59.7475 51 59.7475C50.6685 59.7475 50.3505 59.6158 50.1161 59.3814C49.8817 59.147 49.75 58.829 49.75 58.4975V52.2475H43.5C43.1685 52.2475 42.8505 52.1158 42.6161 51.8814C42.3817 51.647 42.25 51.329 42.25 50.9975C42.25 50.666 42.3817 50.348 42.6161 50.1136C42.8505 49.8792 43.1685 49.7475 43.5 49.7475H49.75V43.4975C49.75 43.166 49.8817 42.848 50.1161 42.6136C50.3505 42.3792 50.6685 42.2475 51 42.2475C51.3315 42.2475 51.6495 42.3792 51.8839 42.6136C52.1183 42.848 52.25 43.166 52.25 43.4975V49.7475H58.5C58.8315 49.7475 59.1495 49.8792 59.3839 50.1136C59.6183 50.348 59.75 50.666 59.75 50.9975C59.75 51.329 59.6183 51.647 59.3839 51.8814C59.1495 52.1158 58.8315 52.2475 58.5 52.2475Z"
        fill={color}
      />
    </Svg>
  );
};
