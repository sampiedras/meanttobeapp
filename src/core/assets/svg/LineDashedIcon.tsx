import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const LineDashedIcon = ({ color = "#6D9493", ...props }: Props) => (
  <Svg
    width={props.width ?? 375}
    height={props.height ?? 197}
    {...props}
    viewBox="0 0 375 197"
    fill="none"
  >
    <Path
      d="M-19.5 196.5C-9.33333 165.667 44.7 104.5 179.5 106.5C314.3 108.5 374.667 36.6667 388 0.5"
      stroke={color}
      strokeDasharray="7 7"
    />
  </Svg>
);
