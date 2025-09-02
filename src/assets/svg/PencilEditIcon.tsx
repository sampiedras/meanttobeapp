import React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

export const PencilEditIcon = ({width = 25, height = 24}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <G id="Edit">
        <Mask
          id="mask0_26_6242"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}>
          <Rect
            id="Bounding box"
            x="0.333984"
            width="24"
            height="24"
            fill="#D9D9D9"
          />
        </Mask>
        <G mask="url(#mask0_26_6242)">
          <Path
            id="edit"
            d="M5.33398 19H6.73398L15.359 10.375L13.959 8.975L5.33398 17.6V19ZM19.634 8.925L15.384 4.725L16.784 3.325C17.1673 2.94167 17.6383 2.75 18.197 2.75C18.755 2.75 19.2257 2.94167 19.609 3.325L21.009 4.725C21.3923 5.10833 21.5923 5.571 21.609 6.113C21.6257 6.65433 21.4423 7.11667 21.059 7.5L19.634 8.925ZM4.33398 21C4.05065 21 3.81332 20.904 3.62198 20.712C3.42998 20.5207 3.33398 20.2833 3.33398 20V17.175C3.33398 17.0417 3.35898 16.9127 3.40898 16.788C3.45898 16.6627 3.53398 16.55 3.63398 16.45L13.934 6.15L18.184 10.4L7.88398 20.7C7.78398 20.8 7.67165 20.875 7.54698 20.925C7.42165 20.975 7.29232 21 7.15898 21H4.33398Z"
            fill="white"
          />
        </G>
      </G>
    </Svg>
  );
};
