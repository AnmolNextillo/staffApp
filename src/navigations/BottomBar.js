import {StyleSheet, View} from 'react-native';
import React from 'react';
import {appColors} from '../utils/color';
import Tabs from './Tabs';

const BottomBar = () => {
  return (
    <View style={styles.containerStyle}>
      <Tabs />
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: appColors.primaryColor,
    flex: 1,
  },
});
