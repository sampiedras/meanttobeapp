import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const RadioButtonIcon = ({ color = "#777B85", ...props }: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    {...props}
    viewBox="0 0 20 20"
    fill="none"
  >
    <Circle cx="10" cy="10" r="9.5" stroke={color} />
  </Svg>
);
