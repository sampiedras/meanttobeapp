import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const DotIcon = ({ color = "#6D9493", ...props }: Props) => (
  <Svg
    width={props.width ?? 6}
    height={props.height ?? 6}
    {...props}
    viewBox="0 0 6 6"
    fill="none"
  >
    <Circle cx="3" cy="3" r="3" fill={color} />
  </Svg>
);
