import React, { ReactNode } from "react";
import {
  ListRenderItem,
  StyleSheet,
  View,
  ViewToken,
  VirtualizedList,
} from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { colorsDark, colorsLight } from "@/core/theme";
import { AppShowEmptyList } from "../AppShowEmptyList";
import { BottomModal } from "../BottomModal";

interface Identifiable {
  id: number | string;
}

type AppBottomModalListProps<
  TDataList extends Identifiable[],
  TData extends Identifiable,
> = {
  bottomModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: (string | number)[];
  top: number;
  data: TDataList;
  isDarkMode: boolean;
  viewAbilityConfig?: {
    itemVisiblePercentThreshold: number;
  };
  renderItem: ListRenderItem<TData> | null | undefined;
  keyExtractor?: ((item: TData, index: number) => string) | undefined;
  onViewableItemsChanged?:
    | ((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => void)
    | null
    | undefined;
  getItemCount?: ((data: TDataList) => number) | undefined;
  getItem?: ((data: TDataList, index: number) => TData) | undefined;
  listFooterComponent?: ReactNode;
  listLoadingComponent?: ReactNode | null;
  isFetching?: boolean;
};

export const AppBottomModalList = <
  TDataList extends Identifiable[],
  TData extends Identifiable,
>({
  top,
  data,
  snapPoints,
  isDarkMode,
  bottomModalRef,
  viewAbilityConfig,
  listFooterComponent,
  listLoadingComponent,
  isFetching,
  getItem,
  renderItem,
  getItemCount,
  keyExtractor,
  onViewableItemsChanged,
}: AppBottomModalListProps<TDataList, TData>) => {
  return (
    <BottomModal
      modalRef={bottomModalRef}
      snapPoints={snapPoints}
      topInset={top}
      backgroundColor={
        isDarkMode
          ? colorsDark.BACKGROUND_SCREEN_COLOR
          : colorsLight.BACKGROUND_SCREEN_COLOR
      }
      enableContentPanningGesture={false}
    >
      <View style={styles.containerList}>
        {isFetching ? listLoadingComponent : null}
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
          style={styles.containerList}
          ListEmptyComponent={isFetching ? null : <AppShowEmptyList />}
          onViewableItemsChanged={onViewableItemsChanged}
        />
        {listFooterComponent}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
  },
});
