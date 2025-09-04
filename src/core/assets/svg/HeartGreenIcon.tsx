import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const HeartGreenIcon = ({ color = "#6D9493", ...props }: Props) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
  >
    <G clip-path="url(#clip0_92_9509)">
      <Path
        d="M12 20C9.39 19.12 3 15.25 3 9C3 6.24 5.24 4 8 4C9.64 4 11.09 4.79 12 6C12.91 4.78 14.37 4 16 4C18.76 4 21 6.23 21 9C21 15.26 14.61 19.12 12 20Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_92_9509">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
