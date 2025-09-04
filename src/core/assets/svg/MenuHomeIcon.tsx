import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props extends SvgProps {
  color?: string;
}

export const MenuHomeIcon = ({
  color = colorsLight.CONTENT_SECONDARY,
  ...props
}: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <Path
      fill={color}
      d="M8 6a2 2 0 1 1-4 0a2 2 0 0 1 4 0m0 6a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m8-14a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m2 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m4-10a2 2 0 1 0 0-4a2 2 0 0 0 0 4m2 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
    />
  </Svg>
);
