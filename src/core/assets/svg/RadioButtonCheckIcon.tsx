import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const RadioButtonCheckIcon = ({
  color = "#6D9493",
  ...props
}: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    {...props}
    viewBox="0 0 20 20"
    fill="none"
  >
    <Circle cx="10" cy="10" r="10" fill={color} />
    <Path
      d="M14.4446 6.66666L8.33344 12.7778L5.55566 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
