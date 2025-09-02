import React from 'react';
import {Dimensions, SectionList, StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {GradientButton} from '@/components';
import {useActions} from './useActions';
import { CheckCircleIcon } from '@/assets/svg';

const screenWidth = Dimensions.get('window').width;

export const DrivesScreen =
  ({}: RootStackScreenProps<RootStackRoutes.DRIVES>) => {
    const {sections, selectedCount, updateDriveSection, handleSelect, loading} =
      useActions();

    const renderItem = ({
      item,
      section,
    }: {
      item: Array<{id: number; name: string; selected: boolean}>;
      section: {title: string};
    }) => (
      <View style={styles.boxItem}>
        {item.map(cell => (
          <TouchableOpacity
            key={cell.id}
            backgroundColor={
              cell.selected ? colorsLight.PRIMARY_COLOR : colorsLight.WHITE
            }
            style={[
              styles.item,
              {
                borderColor: cell.selected
                  ? colorsLight.PRIMARY_COLOR
                  : colorsLight.GRAY_02,
              },
            ]}
            onPress={() => handleSelect(cell.id, section.title)}>
            <Text
              variant="body1"
              color={cell.selected ? colorsLight.WHITE : colorsLight.BLACK}
              style={styles.itemText}>
              {cell.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );

    const renderSectionHeader = ({
      section: {title},
    }: {
      section: {title: string};
    }) => (
      <Text variant="body1" style={styles.titleSection}>
        {title}
      </Text>
    );

    const processedData = sections.map(section => {
      const dataInRows = [];
      for (
        let i = 0;
        i < section.data.length;
        i += Math.floor(screenWidth / 110)
      ) {
        dataInRows.push(
          section.data.slice(i, i + Math.floor(screenWidth / 110)),
        );
      }
      return {...section, data: dataInRows};
    });

    return (
      <View style={styles.container}>
        <Text variant="h6" style={styles.title}>
          What drives you?
        </Text>
        <View row centerH marginV-16>
          <Text variant="caption" style={styles.text}>
            Select the interests that drive you.
          </Text>
        </View>
        <SectionList
          sections={processedData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(_item, index) => `${index}`}
          style={styles.list}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
        <View row centerH marginB-16 centerV>
          <CheckCircleIcon />
          <Text variant="caption" style={styles.text}>
            You have selected{' '}
            <Text variant="caption" style={styles.textCount}>
              {selectedCount}/9 interests.
            </Text>
          </Text>
        </View>
        <GradientButton
          loading={loading}
          label="Save changes"
          height={54}
          style={styles.button}
          onPress={updateDriveSection}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
  },
  text: {
    marginLeft: 8,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  titleSection: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginVertical: 8,
    fontFamily: 'Satoshi-Medium',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  itemText: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  boxItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textCount: {
    fontFamily: 'Satoshi-Black',
  },
  button: {
    marginBottom: 18,
  },
});
