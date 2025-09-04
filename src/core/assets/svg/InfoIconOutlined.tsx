import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props extends SvgProps {
  color?: string;
}

export const InfoIconOutlined = ({
  color = colorsLight.CONTENT_SECONDARY,
  ...props
}: Props) => (
  <Svg
    width={props.width ?? "24"}
    height={props.height ?? "24"}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={color ?? "#000"}
      d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    />
  </Svg>
);
