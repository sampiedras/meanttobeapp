import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native-ui-lib';
import {MatchUserEntity} from '@/api/match/entities/matchEntity';
import {
  ChurchIcon,
  InternetIcon,
  LocationTwoIcon,
  UserIcon,
} from '@/assets/svg';

interface Props {
  data: MatchUserEntity;
  address: string;
}

export const BasicSection = ({data, address}: Props) => {
  return (
    <View row marginV-10>
      <View paddingR-30>
        <View row marginV-8>
          <UserIcon />
          <Text style={styles.text}>
            {data.searching && data?.searching?.name
              ? data?.searching?.name.split(',')[0]
              : `Don't have`}
          </Text>
        </View>
        <View row marginV-8>
          <ChurchIcon />
          <Text style={styles.text}>
            {data.church && data?.church?.name
              ? data?.church?.name.split(',')[0]
              : `Don't have`}
          </Text>
        </View>
      </View>
      <View flex>
        <View row marginV-8>
          <LocationTwoIcon />
          <View style={styles.container}>
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
              {address && address ? address : `Don't have`}
            </Text>
          </View>
        </View>
        <View row marginV-8>
          <InternetIcon />
          <Text style={styles.text}>
            {data.person && data.person.search_range !== 'globally'
              ? 'Near me'
              : 'Globally'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basicIcons: {
    marginRight: 10,
  },
  container: {
    flex: 1,
    maxWidth: '100%',
  },
  text: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 8,
    lineHeight: 18.2,
    color: '#203936',
  },
});
