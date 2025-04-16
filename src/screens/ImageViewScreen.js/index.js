import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { appColors } from '../../utils/color';

const ImageViewScreen = ({ navigation, route }) => {

  const { image } = route.params

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            backgroundColor: appColors.white,
          }}>
          <Text
            style={{ color: appColors.primaryColor }}
            onPress={() => navigation.goBack()}>
            Back
          </Text>
          {/* <Text style={styles.headerText}></Text> */}
        </View>
        <Image source={{ uri: image }} style={styles.imageBox} resizeMode="cover" />
      </SafeAreaView>
  );
};

export default ImageViewScreen;

const styles = StyleSheet.create({
  imageBox: {
    height: "100%",
    width: "100%"
  }
});
