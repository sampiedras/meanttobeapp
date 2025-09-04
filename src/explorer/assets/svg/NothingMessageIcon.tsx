import React from "react";
import Svg, { Ellipse, G, Rect } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const NothingMessageIcon = ({
  width = 215,
  height = 249,
  color = "#BAC2CC",
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 215 249" fill="none">
      <G filter="url(#filter0_d_25_3307)">
        <Rect x="23" y="11" width="169" height="61" rx="13.5" fill="white" />
      </G>
      <Rect
        opacity="0.3"
        x="77"
        y="32"
        width="87"
        height="7"
        rx="3.5"
        fill={color}
      />
      <Rect
        opacity="0.3"
        x="77"
        y="45"
        width="62"
        height="7"
        rx="3.5"
        fill={color}
      />
      <Ellipse
        opacity="0.3"
        cx="52.411"
        cy="42.3608"
        rx="15.411"
        ry="15.3608"
        fill={color}
      />
      <G filter="url(#filter1_d_25_3307)">
        <Rect x="23" y="82" width="169" height="61" rx="13.5" fill="white" />
      </G>
      <Rect
        opacity="0.3"
        x="77"
        y="103"
        width="87"
        height="7"
        rx="3.5"
        fill={color}
      />
      <Rect
        opacity="0.3"
        x="77"
        y="116"
        width="62"
        height="7"
        rx="3.5"
        fill={color}
      />
      <Ellipse
        opacity="0.3"
        cx="52.411"
        cy="113.361"
        rx="15.411"
        ry="15.3608"
        fill={color}
      />
      <G opacity="0.5">
        <G filter="url(#filter2_d_25_3307)">
          <Rect x="23" y="153" width="169" height="61" rx="13.5" fill="white" />
        </G>
        <Rect
          opacity="0.3"
          x="77"
          y="174"
          width="87"
          height="7"
          rx="3.5"
          fill={color}
        />
        <Rect
          opacity="0.3"
          x="77"
          y="187"
          width="62"
          height="7"
          rx="3.5"
          fill={color}
        />
        <Ellipse
          opacity="0.3"
          cx="52.411"
          cy="184.361"
          rx="15.411"
          ry="15.3608"
          fill={color}
        />
      </G>
    </Svg>
  );
};
