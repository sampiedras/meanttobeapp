import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Alert, Keyboard, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Text } from "@react-native-material/core";
import {
  RadioButtonCheckIcon,
  RadioButtonIcon,
  SearchIconV1,
} from "@/core/assets/svg";
import useDebounce from "@/core/hooks/useDebounce";
import { colorsLight } from "@/core/theme";
import { ResponseChurchEntity } from "@/user/data/remote/entities/churchEntity";
import { useLazyGetAllChurchesQuery } from "@/user/data/remote/userApi";
import { useViewModelProvider } from "../../ViewModelContext";

export const ViewChurchFragment = () => {
  const { addChurch, setValue, trigger, setAddChurch, watch } =
    useViewModelProvider();

  const churchName = watch("church.name");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["01%", "90%"], []);
  const [triggerGetAllChurches, { data: churches = [] }] =
    useLazyGetAllChurchesQuery();

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = useDebounce(async (text: string) => {
    Keyboard.dismiss();
    try {
      await triggerGetAllChurches(text);
    } catch {
      Alert.alert("Error", "Not found");
    }
    setLoadingSearch(false);
  }, 1000);

  const handleSave = (church: ResponseChurchEntity) => {
    bottomSheetRef?.current?.snapToIndex(0);
    setValue("church", church, { shouldDirty: true });
    trigger("church");
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef?.current?.snapToIndex(0);
    }
  }, []);

  const onChangeTextSearch = (text: string) => {
    setLoadingSearch(true);
    setSearchText(text);
    handleSearch(text);
  };

  const renderItem = ({ item }: { item: ResponseChurchEntity }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSave(item)}>
      <Text style={styles.textItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBackdrop = useCallback(
    (propsBottom: any) => (
      <BottomSheetBackdrop
        {...propsBottom}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1}
      />
    ),
    [],
  );

  useEffect(() => {
    async function getAsyncData() {
      await triggerGetAllChurches(searchText);
    }
    getAsyncData();
  }, [searchText, triggerGetAllChurches]);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text variant="h6" style={styles.title}>
          Do you belong to a church?
        </Text>
        <TouchableOpacity
          style={[
            styles.radioButton,
            {
              borderColor: addChurch
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
            },
          ]}
          onPress={() => setAddChurch(true)}
        >
          <View style={styles.rowCenterSpread}>
            <Text variant="body1" style={styles.textRadio}>
              Yes
            </Text>
            {addChurch ? <RadioButtonCheckIcon /> : <RadioButtonIcon />}
          </View>
          <TouchableOpacity
            style={[styles.buttonFind, styles.marginT16]}
            disabled={!addChurch}
            onPress={() => bottomSheetRef?.current?.snapToIndex(1)}
          >
            <Text style={styles.textFind} variant="body2">
              {churchName || "Find you church"}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            styles.rowCenter,
            {
              borderColor: !addChurch
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
            },
          ]}
          onPress={() => {
            setAddChurch(false);
            setValue("church", null, { shouldDirty: true });
            trigger("church");
          }}
        >
          <Text variant="body1" style={styles.textRadio}>
            No
          </Text>
          {!addChurch ? <RadioButtonCheckIcon /> : <RadioButtonIcon />}
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
      >
        <View style={[styles.boxTextInput, styles.rowCenterSpread]}>
          <SearchIconV1 width={18} height={18} />
          <BottomSheetTextInput
            value={searchText}
            onChangeText={onChangeTextSearch}
            style={styles.textInput}
            placeholder="Search church"
            placeholderTextColor={colorsLight.GRAY_03}
          />
          {loadingSearch && <ActivityIndicator color="black" size={24} />}
        </View>
        <BottomSheetFlatList
          data={churches || []}
          keyExtractor={(item: ResponseChurchEntity) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 12,
  },
  boxContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  radioButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
  },
  textRadio: {
    fontFamily: "Satoshi-Black",
  },
  buttonFind: {
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
  },
  textFind: {
    fontFamily: "Satoshi-Regular",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boxTextInput: {
    backgroundColor: colorsLight.GRAY_LIGHT,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  rowCenterSpread: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginT16: {
    marginTop: 16,
  },
  textInput: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colorsLight.GRAY_02,
    paddingVertical: 16,
  },
  textItem: {
    fontFamily: "Satoshi-Regular",
  },
});
