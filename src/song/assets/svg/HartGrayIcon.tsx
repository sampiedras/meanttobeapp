import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const HartGrayIcon = ({ color = "#777B85", ...props }: Props) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    {...props}
    fill="none"
  >
    <G clip-path="url(#clip0_56_10348)">
      <Path
        d="M10 16.6667C7.825 15.9333 2.5 12.7083 2.5 7.5C2.5 5.2 4.36667 3.33333 6.66667 3.33333C8.03333 3.33333 9.24167 3.99167 10 5C10.7583 3.98333 11.975 3.33333 13.3333 3.33333C15.6333 3.33333 17.5 5.19167 17.5 7.5C17.5 12.7167 12.175 15.9333 10 16.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_56_10348">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
