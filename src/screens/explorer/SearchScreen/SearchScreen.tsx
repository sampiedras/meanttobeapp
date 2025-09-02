import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import {LocalSvg} from 'react-native-svg';
import {Text} from '@react-native-material/core';
import {useActionsSearch} from './useActions';
import {RenderButtons} from './RenderButtons';
import {RenderItemsSongs} from './RenderItemsSongs';
import {RenderItemsSermons} from './RenderItemsSermons';
import {RenderItemsVerse} from './RenderItemsVerse';
import {RenderItemsNews} from './RenderItemsNews';
import {SongEntity} from '@/api/song/entities/songEntity';
import {SermonEntity} from '@/api/sermon/entities/sermonEntity';
import {VerseEntity} from '@/api/verse/entities/VerseEntity';
import {NewEntity} from '@/api/news/entities/newsEntity';
import {ViewStartSearchFragment} from './ViewStartSearchFragment';
import {ViewCouldNotFindFragment} from './ViewCouldNotFindFragment';
import {RenderItemsQuizzes} from './RenderItemsQuizzes';
import {QuizEntity} from '@/api/quizzes/entities/quizzesEntity';
import {IListButtonEntity} from '@/interfaces/listButtonEntity';

export const SearchScreen = (
  props: RootStackScreenProps<RootStackRoutes.SEARCH>,
) => {
  const {
    activeFragment,
    setButtonActive,
    navigation,
    dataSongs,
    searchText,
    onChangeText,
    dataSermons,
    handleDetailSermon,
    handleDetailSong,
    handleDetailNews,
    handleDetailVerse,
    handleDetailQuiz,
    dataVerse,
    dataNews,
    dataQuizzes,
    listButtonsNavigationExplorer,
  } = useActionsSearch(props);

  const renderItemsSongs = ({item}: {item: SongEntity}) => (
    <RenderItemsSongs
      key={item.id}
      item={item}
      handleDetail={handleDetailSong}
    />
  );
  const renderItemsSermons = ({item}: {item: SermonEntity}) => (
    <RenderItemsSermons
      key={item.id}
      item={item}
      handleDetail={handleDetailSermon}
    />
  );
  const renderItemsVerses = ({item}: {item: VerseEntity}) => (
    <RenderItemsVerse
      key={item.id}
      item={item}
      handleDetail={handleDetailVerse}
    />
  );
  const renderItemsNews = ({item}: {item: NewEntity}) => (
    <RenderItemsNews
      key={item.id}
      item={item}
      handleDetail={handleDetailNews}
    />
  );
  const renderItemsQuizzes = ({item}: {item: QuizEntity}) => (
    <RenderItemsQuizzes
      key={item.id}
      item={item}
      handleDetail={handleDetailQuiz}
    />
  );

  const renderSearchResults = () => {
    if (searchText === '') {
      return <ViewStartSearchFragment />;
    } else if (
      dataSongs?.items.length === 0 &&
      dataSermons?.items.length === 0
    ) {
      return <ViewCouldNotFindFragment searchText={searchText} />;
    } else if (activeFragment && activeFragment) {
      switch (activeFragment) {
        case 1:
          return (
            <FlatList
              data={dataSongs?.items || []}
              renderItem={renderItemsSongs}
              keyExtractor={(item: SongEntity) => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View center paddingT-20>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textNoFound}>
                    No songs found
                  </Text>
                </View>
              }
            />
          );
        case 2:
          return (
            <FlatList
              data={dataVerse?.items || []}
              renderItem={renderItemsVerses}
              keyExtractor={(item: VerseEntity) => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View center paddingT-20>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textNoFound}>
                    No verses found
                  </Text>
                </View>
              }
            />
          );
        case 3:
          return (
            <FlatList
              data={dataSermons?.items || []}
              renderItem={renderItemsSermons}
              keyExtractor={(item: SermonEntity) => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View center paddingT-20>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textNoFound}>
                    No sermons found
                  </Text>
                </View>
              }
            />
          );
        case 4:
          return (
            <FlatList
              data={dataQuizzes?.items || []}
              renderItem={renderItemsQuizzes}
              keyExtractor={(item: QuizEntity) => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View center paddingT-20>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textNoFound}>
                    No quizzes found
                  </Text>
                </View>
              }
            />
          );
        case 5:
          return (
            <FlatList
              data={dataNews?.items || []}
              renderItem={renderItemsNews}
              keyExtractor={(item: NewEntity) => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <View center paddingT-20>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textNoFound}>
                    No news found
                  </Text>
                </View>
              }
            />
          );
        default:
          return null;
      }
    } else {
      return (
        <>
          <Text
            color={colorsLight.PRIMARY_TEXT_COLOR}
            variant="body1"
            style={styles.titleSongs}>
            Songs
          </Text>
          <FlatList
            data={dataSongs?.items || []}
            renderItem={renderItemsSongs}
            keyExtractor={(item: SongEntity) => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View center paddingT-20>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.textNoFound}>
                  No songs found
                </Text>
              </View>
            }
          />
          <Text
            color={colorsLight.PRIMARY_TEXT_COLOR}
            variant="body1"
            style={styles.title}>
            Verses
          </Text>
          <FlatList
            data={dataVerse?.items}
            renderItem={renderItemsVerses}
            keyExtractor={(item: VerseEntity) => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View center paddingT-20>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.textNoFound}>
                  No verses found
                </Text>
              </View>
            }
          />
          <Text
            color={colorsLight.PRIMARY_TEXT_COLOR}
            variant="body1"
            style={styles.title}>
            Sermons
          </Text>
          <FlatList
            data={dataSermons?.items || []}
            renderItem={renderItemsSermons}
            keyExtractor={(item: SermonEntity) => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View center paddingT-20>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.textNoFound}>
                  No sermons found
                </Text>
              </View>
            }
          />
          <Text
            color={colorsLight.PRIMARY_TEXT_COLOR}
            variant="body1"
            style={styles.title}>
            News
          </Text>
          <FlatList
            data={dataNews?.items}
            renderItem={renderItemsNews}
            keyExtractor={(item: NewEntity) => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View center paddingT-20>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.textNoFound}>
                  No news found
                </Text>
              </View>
            }
          />
          <Text
            color={colorsLight.PRIMARY_TEXT_COLOR}
            variant="body1"
            style={styles.title}>
            Quizzes
          </Text>
          <FlatList
            data={dataQuizzes?.items || []}
            renderItem={renderItemsQuizzes}
            keyExtractor={(item: QuizEntity) => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View center paddingT-20>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.textNoFound}>
                  No quizzes found
                </Text>
              </View>
            }
          />
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        row
        centerV
        paddingH-16
        width="100%"
        height={42}
        marginT-20
        style={styles.containerInput}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <LocalSvg asset={require('../../../assets/svg/arrow_back.svg')} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={colorsLight.GRAY_03}
          value={searchText}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
      </View>
      <View
        width="100%"
        height={1}
        backgroundColor={colorsLight.FILL_COLOR_MEDIUM}
        marginT-18
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerScroll}>
        <FlatList
          data={listButtonsNavigationExplorer}
          renderItem={({item, index}) => (
            <RenderButtons
              key={`${item.id}_${index}`}
              title={item.title}
              item={item.id}
              isActive={activeFragment === item.id}
              setActive={setButtonActive}
            />
          )}
          keyExtractor={(item: IListButtonEntity) => `${item?.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <View paddingB-20>{renderSearchResults()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  containerScroll: {
    paddingHorizontal: 16,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  containerInput: {
    gap: 8,
  },
  titleSongs: {
    fontFamily: 'Satoshi-Medium',
  },
  title: {
    fontFamily: 'Satoshi-Medium',
    marginTop: 28,
  },
  input: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    width: '92%',
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
