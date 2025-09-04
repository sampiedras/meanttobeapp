import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const ImageIcon = ({ color = "#6D9493", ...props }: Props) => (
  <Svg
    width={props.width ?? 42}
    height={props.height ?? 42}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
  >
    <G clip-path="url(#clip0_92_9527)">
      <Path
        d="M19.11 20.6C17.14 19.71 15.31 18.53 13.68 17.1L13.42 16.9C11.37 15.26 9.57999 13.85 7.73999 13.98C5.95999 14.27 4.31 15.1 3 16.35"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M13.6699 17.1C14.6499 16 15.9699 15.25 17.4199 14.97C18.5599 14.89 19.68 15.73 20.95 16.74"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M14.9707 10.55C16.0807 10.55 16.9707 9.65005 16.9707 8.55005C16.9707 7.45005 16.0707 6.55005 14.9707 6.55005C13.8707 6.55005 12.9707 7.45005 12.9707 8.55005C12.9707 9.65005 13.8707 10.55 14.9707 10.55Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M17.77 3H6.22998C4.44998 3 3 4.45001 3 6.23001V17.77C3 19.55 4.44998 21 6.22998 21H17.77C19.55 21 21 19.55 21 17.77V6.23001C21 4.45001 19.55 3 17.77 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_92_9527">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
