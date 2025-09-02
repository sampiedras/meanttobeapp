import {colorsLight} from '@/theme/colorsLight';
import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const BtnYesIcon = ({
  width = 64,
  height = 64,
  color = colorsLight.ERROR,
}: Props) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="32" fill={color} />
      <Path
        d="M42.8798 24.1347C42.2512 23.5057 41.5048 23.0068 40.6834 22.6665C39.8619 22.3261 38.9814 22.1509 38.0922 22.1509C37.2029 22.1509 36.3224 22.3261 35.5009 22.6665C34.6795 23.0068 33.9331 23.5057 33.3045 24.1347L31.9998 25.4393L30.6952 24.1347C29.4255 22.8649 27.7033 22.1515 25.9075 22.1515C24.1118 22.1515 22.3896 22.8649 21.1198 24.1347C19.8501 25.4044 19.1367 27.1266 19.1367 28.9224C19.1367 30.7181 19.8501 32.4403 21.1198 33.71L22.4245 35.0147L31.9998 44.59L41.5752 35.0147L42.8798 33.71C43.5088 33.0814 44.0077 32.3351 44.348 31.5136C44.6884 30.6921 44.8636 29.8116 44.8636 28.9224C44.8636 28.0331 44.6884 27.1526 44.348 26.3312C44.0077 25.5097 43.5088 24.7633 42.8798 24.1347V24.1347Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
