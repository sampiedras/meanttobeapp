import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props extends SvgProps {
  color?: string;
}

export const CrossFilledIcon = ({
  color = colorsLight.CONTENT_SECONDARY,
  ...props
}: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    fill="none"
    {...props}
    viewBox="0 0 20 20"
  >
    <Path
      fill={color}
      d="M10 0C4.47 0 0 4.47 0 10s4.47 10 10 10 10-4.47 10-10S15.53 0 10 0zm5 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10 15 13.59z"
    />
  </Svg>
);
