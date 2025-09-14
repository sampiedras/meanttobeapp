import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import { SearchIconV1 } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface IModalSelect {
  visible: boolean;
  data: any[];
  keyToSearch: string;
  keyExtractor: (key: string) => string;
  renderItem: (item: any) => React.ReactNode;
  toggleVisible: () => void;
}

export const ModalSelect = ({
  visible,
  data,
  keyToSearch,
  keyExtractor,
  renderItem,
  toggleVisible,
}: IModalSelect) => {
  const [searchText, setSearchText] = useState("");
  const [dataSearch, setDataSearch] = useState<any[]>(data);

  const onChangeTextSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filteredData = data.filter((item) =>
        item[keyToSearch].toLowerCase().includes(text.toLowerCase()),
      );
      setDataSearch(filteredData);
    } else {
      setDataSearch(data);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => null}
    >
      <SafeAreaView style={styles.container}>
        <View style={[styles.flex1, styles.marginH16, styles.paddingV16]}>
          <View style={[styles.boxTextInput, styles.rowCenterSpread]}>
            <SearchIconV1 width={18} height={18} />
            <TextInput
              value={searchText}
              onChangeText={onChangeTextSearch}
              style={styles.textInput}
              placeholder="Search"
              placeholderTextColor={colorsLight.GRAY_03}
            />
          </View>
          <FlatList
            data={dataSearch}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
          <TouchableOpacity onPress={toggleVisible} style={styles.button}>
            <Text variant="body1">Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  marginH16: {
    marginHorizontal: 16,
  },
  paddingV16: {
    paddingVertical: 16,
  },
  boxTextInput: {
    backgroundColor: colorsLight.GRAY_LIGHT,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  rowCenterSpread: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  button: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colorsLight.PRIMARY_TEXT_COLOR,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
