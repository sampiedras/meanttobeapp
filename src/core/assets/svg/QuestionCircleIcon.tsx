import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  color?: string;
}

export const QuestionCircleIcon = ({ color = "#777B85", ...props }: Props) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
  >
    <G clip-path="url(#clip0_162_9562)">
      <Path
        d="M9.35938 8.63005C9.67937 8.29005 10.0494 8.02005 10.4794 7.85005C10.8994 7.68005 11.3694 7.61005 11.8294 7.64005C12.2994 7.68005 12.7394 7.81005 13.1394 8.04005C13.5394 8.27005 13.8794 8.60005 14.1294 8.98005C14.3794 9.37005 14.5494 9.80005 14.6194 10.27C14.6694 10.72 14.6394 11.2 14.4894 11.63C14.3594 12.06 14.1094 12.4801 13.7894 12.7901C13.4594 13.1201 13.0694 13.3701 12.6294 13.5301"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16.5H12.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_162_9562">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
