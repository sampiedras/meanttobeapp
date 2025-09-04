import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const UserCircleIcon = ({
  width = 24,
  height = 24,
  color = colorsLight.PRIMARY_COLOR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_92_9545)">
        <Path
          d="M11.9984 12.36C13.3384 12.36 14.4283 11.27 14.4283 9.92999C14.4283 8.58999 13.3384 7.5 11.9984 7.5C10.6584 7.5 9.56836 8.58999 9.56836 9.92999C9.56836 11.27 10.6584 12.36 11.9984 12.36Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.36914 16.5C10.5491 14.51 13.4191 14.5 14.6191 16.48V16.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_92_9545">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
