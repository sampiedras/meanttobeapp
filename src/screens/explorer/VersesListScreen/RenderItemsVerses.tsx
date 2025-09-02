import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {IVerseResponse} from '@/api/verse/entities/verseEntity';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {RootStackRoutes} from '@/types/stackRoutes';
import {useNavigation} from '@react-navigation/native';
import {useGetVerseReferenceByIdQuery} from '@/api/bible/bibleApi';
import {useFindVerseByIdQuery} from '@/api/verse/verseApi';
import FastImage from 'react-native-fast-image';

interface Props {
  item: IVerseResponse;
}

export const RenderItemsVerses = ({item}: Props) => {
  const [imgVerse, setImgVerse] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setImgVerse(item?.img);
  }, [item?.img]);

  const {data: verseData} = useFindVerseByIdQuery(item?.id || '');

  const {data: verseReference} = useGetVerseReferenceByIdQuery(
    verseData?.verseQuote.split('&')[0] || '',
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(RootStackRoutes.VERSES_DETAIL, {
          id: item.id,
          reference: verseReference?.reference || '',
          text: item?.verseQuote.split('&')[1],
          img: item.shareImg,
        })
      }>
      <View
        style={styles.cardContainer}
        width="100%"
        marginB-24
        paddingH-20
        paddingV-32>
        <FastImage
          style={styles.image}
          source={{uri: imgVerse || '', priority: FastImage.priority.normal}}
        />
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.verseQuote}>{verseReference?.reference}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colorsLight.BORDER_GRAY_COLOR,
    borderRadius: 16,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Satoshi-Black',
    lineHeight: 24,
    marginVertical: 16,
  },
  verseQuote: {
    color: colorsLight.SECONDARY_TEXT_COLOR,
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    lineHeight: 28.0,
  },
  image: {
    width: '100%',
    height: 155,
    borderRadius: 24,
  },
});
