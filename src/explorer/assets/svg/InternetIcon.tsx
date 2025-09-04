import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const InternetIcon = ({
  width = 16,
  height = 17,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
      <G clip-path="url(#clip0_212_15863)">
        <Path
          d="M8 14.5C11.3133 14.5 14 11.8133 14 8.5C14 5.18667 11.3133 2.5 8 2.5C4.68667 2.5 2 5.18667 2 8.5C2 11.8133 4.68667 14.5 8 14.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <Path
          d="M8.00065 14.5C9.47398 14.5 10.6673 11.8133 10.6673 8.5C10.6673 5.18667 9.47398 2.5 8.00065 2.5C6.52732 2.5 5.33398 5.18667 5.33398 8.5C5.33398 11.8133 6.52732 14.5 8.00065 14.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <Path
          d="M2 8.22021C5.96667 8.95355 10.0333 8.95355 14 8.22021"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_15863">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
