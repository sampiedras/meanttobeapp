import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const MessagesTabBarIcon = ({
  width = 24,
  height = 24,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_212_14553)">
        <Path
          d="M10.6497 10.65H8.84961"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.1497 10.65H13.3496"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.00049 13.81V6.60001C3.00049 4.62001 4.62046 3 6.60046 3H17.4005C19.3805 3 21.0005 4.62001 21.0005 6.60001V13.81C21.0005 15.79 19.3805 17.41 17.4005 17.41H15.9505C15.7105 17.41 15.4805 17.5 15.3105 17.67L11.9905 20.99L8.67047 17.67C8.50047 17.5 8.27052 17.41 8.03052 17.41H6.58051C4.60051 17.41 2.98047 15.79 2.98047 13.81H3.00049Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_14553">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
