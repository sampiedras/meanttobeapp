import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

export const SendAudioIcon = ({ width = 30, height = 30 }: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <G id="material-symbols:arrow-upward">
        <Path
          id="Vector"
          d="M13.75 25V9.78125L6.75 16.7812L5 15L15 5L25 15L23.25 16.7812L16.25 9.78125V25H13.75Z"
          fill="white"
        />
      </G>
    </Svg>
  );
};
