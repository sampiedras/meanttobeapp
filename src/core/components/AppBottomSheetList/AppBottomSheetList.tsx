import React from "react";
import {
  ListRenderItem,
  Platform,
  StyleSheet,
  ViewToken,
  VirtualizedList,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { colorsDark, colorsLight } from "@/core/theme";
import { AppShowEmptyList } from "../AppShowEmptyList";

interface Identifiable {
  id: number | string;
}

type AppBottomSheetListProps<
  TDataList extends Identifiable[],
  TData extends Identifiable,
> = {
  bottomModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: (string | number)[];
  indexTap: number;
  top: number;
  data: TDataList;
  isDarkMode: boolean;
  viewAbilityConfig?: {
    itemVisiblePercentThreshold: number;
  };
  setIndexTap: (index: number) => void;
  renderItem: ListRenderItem<TData> | null | undefined;
  keyExtractor?: ((item: TData, index: number) => string) | undefined;
  onViewableItemsChanged?:
    | ((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => void)
    | null
    | undefined;
  getItemCount?: ((data: TDataList) => number) | undefined;
  getItem?: ((data: TDataList, index: number) => TData) | undefined;
};

export const AppBottomSheetList = <
  TDataList extends Identifiable[],
  TData extends Identifiable,
>({
  top,
  data,
  indexTap,
  snapPoints,
  isDarkMode,
  bottomModalRef,
  viewAbilityConfig,
  getItem,
  renderItem,
  setIndexTap,
  getItemCount,
  keyExtractor,
  onViewableItemsChanged,
}: AppBottomSheetListProps<TDataList, TData>) => {
  return (
    <BottomSheet
      ref={bottomModalRef}
      snapPoints={snapPoints}
      index={indexTap}
      topInset={top}
      backgroundStyle={[
        {
          backgroundColor: isDarkMode
            ? colorsDark.BACKGROUND_SCREEN_COLOR
            : colorsLight.BACKGROUND_SCREEN_COLOR,
        },
        styles.containerModal,
      ]}
      onChange={(index) => {
        setIndexTap(index);
      }}
      enableContentPanningGesture={false}
    >
      <VirtualizedList
        windowSize={10}
        viewabilityConfig={viewAbilityConfig}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemCount={getItemCount}
        getItem={getItem}
        style={styles.container}
        ListEmptyComponent={<AppShowEmptyList />}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 60 : 32,
    flex: 1,
  },
  containerModal: {
    borderRadius: 0,
  },
});
