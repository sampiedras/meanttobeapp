import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Template: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Text>Template</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
