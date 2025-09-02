import React, {useCallback} from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {Linking, SafeAreaView, StyleSheet} from 'react-native';
import {GradientButton} from '@/components';

interface Props {
  title: string;
}

export const PermissionsConfiguration = ({title}: Props) => {
  const handlePress = useCallback(async () => {
    await Linking.openSettings();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View flex-1 center centerV paddingH-16>
        <Text style={styles.title}>Necessary Permissions</Text>
        <Text style={styles.description}>
          To get the most out of our app, we need access to your {title}.
        </Text>
        <Text style={styles.description}>
          Would you like to activate this functionality now?
        </Text>
        <GradientButton label="Open Settings" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Satoshi-Regular',
  },
});
