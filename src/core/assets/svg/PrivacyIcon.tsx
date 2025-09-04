import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props extends SvgProps {
  color?: string;
}

export const PrivacyIcon = ({
  color = colorsLight.SECONDARY_TEXT_COLOR,
  ...props
}: Props) => {
  return (
    <Svg
      width={props.width ?? 20}
      height={props.height ?? 20}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
