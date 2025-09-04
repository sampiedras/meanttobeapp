import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const PlayIcon = ({ color = "#FFFFFF", ...props }: Props) => (
  <Svg
    width={props.width ?? 18}
    height={props.height ?? 21}
    {...props}
    viewBox="0 0 18 21"
    fill="none"
  >
    <Path
      d="M2.87467 20.5416C2.31912 20.9027 1.75634 20.9233 1.18634 20.6033C0.617452 20.2844 0.333008 19.7916 0.333008 19.125V1.87497C0.333008 1.2083 0.617452 0.714971 1.18634 0.394971C1.75634 0.0760818 2.31912 0.0971931 2.87467 0.458304L16.458 9.0833C16.958 9.41664 17.208 9.88886 17.208 10.5C17.208 11.1111 16.958 11.5833 16.458 11.9166L2.87467 20.5416Z"
      fill={color}
    />
  </Svg>
);
