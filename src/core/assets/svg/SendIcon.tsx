import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const SendIcon = ({
  width = 24,
  height = 24,
  color = colorsLight.PRIMARY_TEXT_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_1_4275)">
        <Path
          d="M21 3L15.23 20.33C14.95 21.17 13.8 21.24 13.42 20.45L10.21 13.8L21 3.01V3Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 3.00023L10.21 13.7902L3.56004 10.5702C2.77004 10.1902 2.84004 9.03023 3.68004 8.75023L21.0101 2.99023L21 3.00023Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_4275">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
