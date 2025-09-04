import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { SearchIconV1 } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface IModalSelect {
  visible: boolean;
  data: any[];
  keyToSearch: string;
  keyExtractor: (key: string) => string;
  renderItem: (item: any) => JSX.Element;
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
        <View flex-1 marginH-16 paddingV-16>
          <View style={styles.boxTextInput} centerV row spread>
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
  boxTextInput: {
    backgroundColor: colorsLight.GRAY_LIGHT,
    height: 40,
    borderRadius: 8,
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
