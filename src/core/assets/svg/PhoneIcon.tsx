import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const PhoneIcon = ({ ...props }: Props) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill="none"
    {...props}
    viewBox="0 0 24 24"
  >
    <Path
      fill={props.color}
      d="M10 20h4v-1h-4zm-3 3q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.587 1.413T17 23zm0-7h10V6H7z"
    />
  </Svg>
);
