import { DataCarouselType } from "../screens/ExplorerScreen/ViewModelContext";

export const orderData = (type: string, data: any): DataCarouselType[] => {
  return data.map((i: any) => ({
    ...i,
    sk: i.sk,
    name: i?.name || i?.title,
    type,
  }));
};
