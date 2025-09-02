import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const MicrophoneBlackIcon = ({width = 20, height = 20}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 256 256">
      <Path
        fill="#1C1C21"
        d="M80 128V64a48 48 0 0 1 96 0v64a48 48 0 0 1-96 0m128 0a8 8 0 0 0-16 0a64 64 0 0 1-128 0a8 8 0 0 0-16 0a80.11 80.11 0 0 0 72 79.6V232a8 8 0 0 0 16 0v-24.4a80.11 80.11 0 0 0 72-79.6"
      />
    </Svg>
  );
};
