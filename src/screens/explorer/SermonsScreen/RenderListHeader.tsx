import {FlatList, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import Carousel from 'react-native-reanimated-carousel';
import {colorsLight} from '@/theme/colorsLight';
import {Tag} from '@/components';
import {RenderItemTopSermons} from './RenderItemTopSermons';
import {TypeFragment} from './TypeFragment';
import type {TopSermonsEntity} from '@/api/sermon/entities/sermonEntity';
import type {TypeSermonEntity} from '@/api/typeSermon/entities/typeSermonEntity';

interface Props {
  sermonCount: number;
  dataTopSermon: TopSermonsEntity[];
  typeSelect: number;
  dataTypeSermon: TypeSermonEntity[];
  handleSelectType: (id: number) => void;
  handleNavigateDetail: (
    sermonId: number,
    title: string,
    urlYouTube: string,
  ) => void;
}

export const RenderListHeader = ({
  sermonCount,
  dataTopSermon,
  typeSelect,
  dataTypeSermon,
  handleSelectType,
  handleNavigateDetail,
}: Props) => (
  <>
    <View row spread centerV marginV-20 width={'100%'}>
      <Text
        variant="h4"
        color={colorsLight.PRIMARY_TEXT_COLOR}
        style={styles.title}>
        Sermons
      </Text>
      <Tag
        title={`${sermonCount} Sermon${sermonCount > 1 ? 's' : ''}`}
        backgroundColor={colorsLight.BLUE_MAGENTA_LIGHT}
        width={104}
        height={32}
        fontSize={12}
        fontFamily="Satoshi-Medium"
      />
    </View>
    <View marginV-10 paddingL-8>
      <Text
        variant="body1"
        color={colorsLight.PRIMARY_TEXT_COLOR}
        style={styles.titleTopSermons}>
        Top sermons
      </Text>
    </View>
    <Carousel
      loop={false}
      style={styles.listTopSermons}
      width={230}
      height={190}
      data={dataTopSermon}
      scrollAnimationDuration={500}
      renderItem={({item}) => (
        <RenderItemTopSermons
          item={item}
          handleNavigateDetail={handleNavigateDetail}
        />
      )}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
    />
    <Text
      variant="body1"
      color={colorsLight.PRIMARY_TEXT_COLOR}
      style={styles.titleAllSermons}>
      All sermons
    </Text>
    <View marginB-16>
      <FlatList
        horizontal
        renderItem={({item: {name, id}}) => (
          <TypeFragment
            name={name}
            isActive={typeSelect === id}
            handleSelect={() => handleSelectType(id)}
          />
        )}
        data={dataTypeSermon}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View width={10} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: TypeSermonEntity) => `${item?.id}`}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Satoshi-Bold',
  },
  titleTopSermons: {
    fontFamily: 'Satoshi-Black',
  },
  titleAllSermons: {
    fontFamily: 'Satoshi-Black',
    marginVertical: 30,
  },
  listTopSermons: {
    flex: 1,
    width: '100%',
  },
});
