import {Dimensions, SectionList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {
  useLazyFindAllDriveQuery,
  useLazyFindAllTypeDriveQuery,
} from '@/api/drive/driveApi';
import {SectionData} from './useActions';

const screenWidth = Dimensions.get('window').width;

interface IViewDriversFragment {
  sections: SectionData[];
  selectedCount: number;
  setSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
  setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
}

interface Drive {
  pk: string;
  sk: string;
  name: string;
}

interface TypeDrive {
  sk: string;
  name: string;
}

export const ViewDriversFragment = ({
  sections,
  selectedCount,
  setSections,
  setSelectedCount,
}: IViewDriversFragment) => {
  const [triggerFindAllDrives, {data: dataDrives = []}] =
    useLazyFindAllDriveQuery();
  const [triggerTypeDrives, {data: dataTypeDrives = []}] =
    useLazyFindAllTypeDriveQuery();

  useEffect(() => {
    async function getAsyncData() {
      try {
        await triggerTypeDrives();
        await triggerFindAllDrives();

        if (dataTypeDrives && dataDrives) {
          const typeDriveMap: {
            [key: string]: {name: string; typeDriveId: string};
          } = dataTypeDrives.reduce(
            (
              acc: {[key: string]: {name: string; typeDriveId: string}},
              typeDrive: TypeDrive,
            ) => {
              const typeDriveId = typeDrive.sk.split('#')[1];
              acc[typeDriveId] = {name: typeDrive.name, typeDriveId};
              return acc;
            },
            {},
          );

          const result = Object.keys(typeDriveMap).map((typeId: string) => {
            return {
              title: typeDriveMap[typeId].name,
              typeDriveId: typeDriveMap[typeId].typeDriveId,
              data: dataDrives
                .filter((drive: Drive) => drive.pk === `DRIVE#${typeId}`)
                .map((drive: Drive) => ({
                  id: drive.sk.split('#')[1],
                  name: drive.name,
                  selected: false,
                  type: typeDriveMap[typeId].name, // Agregar la propiedad 'type'
                })),
            };
          });

          setSections(result);
        }
      } catch (error) {
        setSections([]);
      }
    }
    getAsyncData();
  }, [dataTypeDrives, dataDrives]);

  const handleSelect = (itemId: string, sectionTitle: string) => {
    const updatedSections = sections.map(section => {
      if (section.title === sectionTitle) {
        return {
          ...section,
          data: section.data.map(item => {
            if (item.id === itemId) {
              if (item.selected) {
                setSelectedCount(prevCount => prevCount - 1);
                return {...item, selected: false};
              } else {
                if (selectedCount < 9) {
                  setSelectedCount(prevCount => prevCount + 1);
                  return {...item, selected: true};
                }
              }
            }
            return item;
          }),
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const renderItem = ({
    item,
    section,
  }: {
    item: Array<{id: string; name: string; selected: boolean}>;
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
      dataInRows.push(section.data.slice(i, i + Math.floor(screenWidth / 110)));
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
        showsVerticalScrollIndicator={false}
        sections={processedData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(_item, index) => `${index}`}
        style={styles.list}
        stickySectionHeadersEnabled={false}
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
    fontFamily: 'Satoshi-Black',
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
});

export default ViewDriversFragment;
