import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colorsLight } from "@/core/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const DeleteIcon = ({
  width = 16,
  height = 16,
  color = colorsLight.BLACK,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G id="Group">
        <Path
          id="Vector"
          d="M3.09009 7.34961L4.93005 17.4396C5.09005 18.3396 5.88005 18.9996 6.80005 18.9996H13.1901C14.1101 18.9996 14.9001 18.3496 15.0601 17.4396L16.9001 7.34961"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_2"
          d="M1.03003 4.17969H19.03"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_3"
          d="M5.21997 4.17977L6.69 1.49977C6.86 1.19977 7.18002 1.00977 7.52002 1.00977H12.48C12.83 1.00977 13.15 1.19977 13.31 1.49977L14.78 4.17977"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_4"
          d="M12.01 11H7.98999"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
