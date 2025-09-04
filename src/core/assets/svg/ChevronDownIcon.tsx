import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const ChevronDownIcon = ({ color = "#1C1C21", ...props }: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    {...props}
    viewBox="0 0 16 17"
    fill="none"
  >
    <Path
      d="M4 6.5L8 10.5L12 6.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
