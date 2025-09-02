import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const ChevronDownIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m4 6.5 4 4 4-4"
      stroke="#1C1C21"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
