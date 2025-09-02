import {StyleSheet} from 'react-native';
import React from 'react';
import {Text} from '@react-native-material/core';
import {UserDriveSectionEntity} from '@/api/user/entities/userEntity';
import {colorsLight} from '@/theme/colorsLight';
import {View} from 'react-native-ui-lib';

interface Props {
  data: UserDriveSectionEntity[];
}

export const InterestSection = ({data}: Props) => {
  return (
    <View>
      {data.length > 0 ? (
        <View style={styles.container}>
          {data?.map((userDriveSection, index) => (
            <View key={index} style={styles.group}>
              <View
                key={index}
                backgroundColor={colorsLight.GRAY_02}
                style={[
                  styles.item,
                  {
                    borderColor: colorsLight.GRAY_02,
                  },
                ]}>
                <Text style={styles.itemText}>
                  {userDriveSection?.driveSection?.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View center>
          <Text style={styles.textEmpty}>don't have Interests yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  group: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    margin: 4,
  },
  itemText: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
    fontSize: 13,
    color: '#203936',
  },
  textEmpty: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
    fontSize: 20,
    color: '#203936',
  },
});
