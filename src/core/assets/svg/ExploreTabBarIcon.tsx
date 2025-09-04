import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const ExploreTabBarIcon = ({
  width = 24,
  height = 24,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_212_14170)">
        <Path
          d="M11.74 20.48C16.567 20.48 20.48 16.567 20.48 11.74C20.48 6.91303 16.567 3 11.74 3C6.91303 3 3 6.91303 3 11.74C3 16.567 6.91303 20.48 11.74 20.48Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <Path
          d="M18.0303 18.03L21.0003 21"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_14170">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
