import type {ViewStyle} from 'react-native';

export const PAGES = 5;
export const BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];

export const thumbsUp = '\uD83D\uDC4D';

export type CreatePage = {
  key: number;
  style: ViewStyle;
};

export const createPage = (key: number): CreatePage => {
  return {
    key: key,
    style: {
      backgroundColor: BGCOLOR[key % BGCOLOR.length],
      alignItems: 'center',
      padding: 20,
    },
  };
};
