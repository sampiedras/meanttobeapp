import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const EmailIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.167 3.333H3.833c-.916 0-1.658.75-1.658 1.667l-.008 10c0 .917.75 1.667 1.666 1.667h13.334c.916 0 1.666-.75 1.666-1.667V5c0-.917-.75-1.667-1.666-1.667m-.334 3.542-5.891 3.683a.84.84 0 0 1-.884 0L4.167 6.875a.708.708 0 1 1 .75-1.2L10.5 9.167l5.583-3.492a.709.709 0 1 1 .75 1.2"
      fill="#fff"
    />
  </Svg>
);
