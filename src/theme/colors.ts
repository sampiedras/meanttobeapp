import { ColorInterface } from "./interfaces";

export const palette: ColorInterface = {
  green: (alpha?: string) => `rgba(78, 107, 81, ${alpha || 1})`,
  greenlight: (alpha?: string) => `rgba(142, 166, 139, ${alpha || 1})`,
  blue: (alpha?: string) => `rgba(32, 57, 54, ${alpha || 1})`,
  bluelight: (alpha?: string) => `rgba(108, 147, 146, ${alpha || 1})`,
  blackoffe: (alpha?: string) => `rgba(118, 77, 36, ${alpha || 1})`,
  beaver: (alpha?: string) => `rgba(203, 189, 176, ${alpha || 1})`,
  bone: (alpha?: string) => `rgba(234, 224, 204, ${alpha || 1})`,
  cultured: (alpha?: string) => `rgba(245, 243, 245, ${alpha || 1})`,
  neutral: (alpha?: string) => `rgba(28, 28, 33, ${alpha || 1})`,
  red: (alpha?: string) => `rgba(128, 23, 6, ${alpha || 1})`,
  redlight: (alpha?: string) => `rgba(216, 82, 69, ${alpha || 1})`,
  yellow: (alpha?: string) => `rgba(229, 162, 51, ${alpha || 1})`,
  greendark: (alpha?: string) => `rgba(17, 55, 39, ${alpha || 1})`,
};