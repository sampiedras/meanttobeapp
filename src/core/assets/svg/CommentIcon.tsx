import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props extends SvgProps {
  color?: string;
}

export const CommentIcon = ({
  color = colorsLight.CONTENT_SECONDARY,
  ...props
}: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    fill="none"
    color={color}
    {...props}
    viewBox="0 0 24 24"
  >
    <G fill="none" stroke={color} strokeLinejoin="round">
      <Path
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M12 21a9 9 0 1 0-8-4.873L3 21l4.873-1c1.236.639 2.64 1 4.127 1"
      />
      <Path
        strokeWidth="2.25"
        d="M7.5 12h.01v.01H7.5zm4.5 0h.01v.01H12zm4.5 0h.01v.01h-.01z"
      />
    </G>
  </Svg>
);
