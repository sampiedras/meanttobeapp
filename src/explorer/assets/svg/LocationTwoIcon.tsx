import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const LocationTwoIcon = ({
  width = 16,
  height = 17,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
      <G clip-path="url(#clip0_212_15853)">
        <Path
          d="M12.6673 7.30001C12.6673 11.5 8.00065 14.5 8.00065 14.5C8.00065 14.5 3.33398 11.5 3.33398 7.30001C3.33398 4.64667 5.42065 2.5 8.00065 2.5C10.5807 2.5 12.6673 4.64667 12.6673 7.30001Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.99923 9.1C8.99334 9.1 9.79923 8.29412 9.79923 7.30001C9.79923 6.3059 8.99334 5.5 7.99923 5.5C7.00511 5.5 6.19922 6.3059 6.19922 7.30001C6.19922 8.29412 7.00511 9.1 7.99923 9.1Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_15853">
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
