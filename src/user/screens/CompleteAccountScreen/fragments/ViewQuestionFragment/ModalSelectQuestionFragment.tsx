import React, { useState } from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { CloseDisabledIcon } from "@/core/assets/svg";
import {
  AppGradientButton,
  ButtonSelect,
  CircleButton,
} from "@/core/components";
import {
  useGetBooksByBibleIdQuery,
  useLazyGetChapterByBookIdQuery,
  useLazyGetVerseByBookIdQuery,
} from "@/core/data/remote/bibleApi";
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from "@/core/data/remote/entities/bibleEntity";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

interface IModalSelectQuestionFragment {
  visible: boolean;
  triggerGetPassage: any;
  dataPassage: any;
  handleSavePassage: () => void;
  onClose: () => void;
}

export const ModalSelectQuestionFragment = ({
  visible,
  dataPassage,
  triggerGetPassage,
  onClose,
  handleSavePassage,
}: IModalSelectQuestionFragment) => {
  const {
    selectedBook,
    selectedChapter,
    selectedVerse,
    setSelectedBook,
    setSelectedChapter,
    setSelectedVerse,
  } = useViewModelProvider();
  const { data: dataBooksApi = [] } = useGetBooksByBibleIdQuery();
  const [triggerGetChapters, { data: dataChaptersApi = [] }] =
    useLazyGetChapterByBookIdQuery();
  const [triggerGetVerse, { data: dataVersesApi = [] }] =
    useLazyGetVerseByBookIdQuery();

  const [modalBook, setModalBook] = useState(false);
  const [modalChapter, setModalChapter] = useState(false);
  const [modalVerse, setModalVerse] = useState(false);

  const toggleModalBook = () => setModalBook(!modalBook);
  const toggleModalChapter = () => setModalChapter(!modalChapter);
  const toggleModalVerse = () => setModalVerse(!modalVerse);

  const handleGetBook = async (item: BooksEntity) => {
    try {
      setModalBook(false);
      setSelectedBook(item);
      await triggerGetChapters(item.id);
    } catch (error: any) {
      Alert.alert("Not found Chapters", error?.message);
    }
  };

  const handleGetChapters = async (item: ChapterEntity) => {
    try {
      setModalChapter(false);
      setSelectedChapter(item);
      await triggerGetVerse(item.id);
    } catch (error: any) {
      Alert.alert("Not found Verses", error?.message);
    }
  };

  const handleGetVerses = async (item: VerseEntity) => {
    try {
      setModalVerse(false);
      await triggerGetPassage(item.orgId);
      setSelectedVerse(item);
    } catch (error: any) {
      Alert.alert("Not found", error?.message);
    }
  };

  const renderItemBooks = ({ item }: { item: BooksEntity }) => (
    <TouchableOpacity
      row
      centerV
      spread
      style={styles.button}
      onPress={() => handleGetBook(item)}
    >
      <Text variant="body1" style={styles.textItem} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItemChapters = ({ item }: { item: ChapterEntity }) => (
    <TouchableOpacity
      row
      centerV
      spread
      style={styles.button}
      onPress={() => handleGetChapters(item)}
    >
      <Text variant="body1" style={styles.textItem} numberOfLines={2}>
        {item.number}
      </Text>
    </TouchableOpacity>
  );

  const renderItemVerses = ({ item }: { item: VerseEntity }) => (
    <TouchableOpacity
      row
      centerV
      spread
      style={styles.button}
      onPress={() => handleGetVerses(item)}
    >
      <Text variant="body1" style={styles.textItem} numberOfLines={2}>
        {item.reference}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => null}
    >
      <View flex-1 backgroundColor="rgba(0, 0, 0, 0.5)">
        <View style={styles.contentContainer}>
          <View style={styles.container}>
            <View flex-1>
              <View row centerV>
                <CircleButton
                  style={styles.buttonClose}
                  onPress={onClose}
                  backgroundColor={colorsLight.FILL_COLOR_LIGHT}
                  height={30}
                  width={30}
                  icon={<CloseDisabledIcon />}
                />
                <View style={styles.containerTextFind}>
                  <Text variant="h6" style={styles.titleFind}>
                    Find your Bible verse
                  </Text>
                </View>
              </View>

              <Text variant="caption" style={styles.text}>
                Choose the Bible book, chapter and verse.
              </Text>
              <ButtonSelect
                visible={modalBook}
                data={dataBooksApi}
                label="Select your Bible book"
                value={selectedBook?.name || ""}
                keyToSearch="name"
                toggleVisible={toggleModalBook}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={renderItemBooks}
              />
              {dataChaptersApi?.length > 0 && (
                <ButtonSelect
                  visible={modalChapter}
                  data={dataChaptersApi}
                  label="Select chapter"
                  value={selectedChapter?.number || ""}
                  keyToSearch="number"
                  toggleVisible={toggleModalChapter}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={renderItemChapters}
                />
              )}
              {dataVersesApi?.length > 0 && (
                <ButtonSelect
                  visible={modalVerse}
                  data={dataVersesApi}
                  label="Select your verse"
                  value={selectedVerse?.reference || ""}
                  keyToSearch="reference"
                  toggleVisible={toggleModalVerse}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={renderItemVerses}
                />
              )}

              {dataPassage && dataPassage?.id && (
                <>
                  <Text style={styles.passage}>
                    {dataPassage?.content?.split(" [")[1].split("] ")[1]}
                  </Text>

                  <Text variant="body1" style={styles.referencePassage}>
                    {dataPassage?.id}
                  </Text>
                </>
              )}
            </View>
            <View style={styles.buttonSave}>
              <AppGradientButton
                label="Save"
                disabled={!selectedBook || !selectedChapter || !selectedVerse}
                onPress={handleSavePassage}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "100%",
    height: "90%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 32,
    backgroundColor: "white",
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  containerTextFind: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  titleFind: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: "Satoshi-Black",
  },
  text: {
    marginTop: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: "Satoshi-Regular",
  },
  passage: {
    marginTop: 16,
    fontSize: 20,
    fontFamily: "Satoshi-Black",
  },
  referencePassage: {
    textAlign: "left",
    alignSelf: "flex-start",
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginLeft: 8,
    fontFamily: "Satoshi-Regular",
  },
  buttonSave: {
    marginBottom: 24,
    marginHorizontal: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    borderColor: colorsLight.GRAY_02,
  },
  textItem: {
    flex: 1,
    fontFamily: "Satoshi-Medium",
  },
  buttonClose: {
    marginRight: 20,
  },
});
