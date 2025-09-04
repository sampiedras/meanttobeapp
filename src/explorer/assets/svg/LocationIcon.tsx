import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const LocationIcon = ({
  width = 16,
  height = 16,
  color = "#6D9493",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clip-path="url(#clip0_212_11044)">
        <Path
          d="M12.6673 6.80001C12.6673 11 8.00065 14 8.00065 14C8.00065 14 3.33398 11 3.33398 6.80001C3.33398 4.14667 5.42065 2 8.00065 2C10.5807 2 12.6673 4.14667 12.6673 6.80001Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.99923 8.6C8.99334 8.6 9.79923 7.79412 9.79923 6.80001C9.79923 5.8059 8.99334 5 7.99923 5C7.00511 5 6.19922 5.8059 6.19922 6.80001C6.19922 7.79412 7.00511 8.6 7.99923 8.6Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_212_11044">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
