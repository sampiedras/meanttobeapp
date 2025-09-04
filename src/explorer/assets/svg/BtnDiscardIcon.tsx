import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

export const BtnDiscardIcon = ({ width = 64, height = 64 }: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="32" fill="#D8D8DE" />
      <Path
        d="M39.3845 24.6157L24.6152 39.385"
        stroke="#393842"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.6152 24.6157L39.3845 39.385"
        stroke="#393842"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
