import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const EditIcon = ({ color = "#777B85", ...props }: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    {...props}
    viewBox="0 0 20 20"
    fill="none"
  >
    <G clipPath="url(#clip0_140_7332)">
      <Path
        d="M6.56647 14.7833L3.34147 15.2417C3.04147 15.2833 2.8248 15.075 2.86646 14.7667L3.32479 11.525C3.37479 11.15 3.54982 10.8 3.82482 10.5167L11.4914 2.80835C12.5248 1.76668 14.1915 1.76668 15.2248 2.80835C16.2581 3.85002 16.2581 5.52502 15.2248 6.55835L7.55814 14.2667C7.29147 14.55 6.94147 14.725 6.56647 14.775V14.7833Z"
        stroke={color}
        strokeMiterlimit="10"
      />
      <Path
        d="M13.1083 4.96667L12 6.08334"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M11.3418 17.0333H16.2001"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_140_7332">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
