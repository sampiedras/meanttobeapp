import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {VerseEntity} from '@/api/verse/entities/VerseEntity';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {useGetVerseReferenceByIdQuery} from '@/api/bible/bibleApi';

interface Props {
  item: VerseEntity;
  handleDetail: (
    id: number,
    text: string,
    verseQuote: string,
    img: string,
  ) => void;
}

export const RenderItemsVerse = ({item, handleDetail}: Props) => {
  const {data: verseReference} = useGetVerseReferenceByIdQuery(
    item?.verseQuote.split('&')[0] || '',
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        handleDetail(item.id, item.name, item.verseQuote, item.img)
      }>
      <Text
        color={colorsLight.PRIMARY_TEXT_COLOR}
        variant="body1"
        style={styles.textName}>
        {item.name}
      </Text>
      <Text
        color={colorsLight.SECONDARY_TEXT_COLOR}
        variant="body2"
        style={styles.textVerseQuote}>
        {verseReference?.reference}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 16,
    backgroundColor: colorsLight.GRAY_LIGHT,
    padding: 16,
  },
  textName: {
    fontFamily: 'Satoshi-Medium',
  },
  textVerseQuote: {
    fontFamily: 'Satoshi-Regular',
  },
});
