import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import {appColors} from '../../utils/color';
  import {useNavigation} from '@react-navigation/core';
  
  const Session = () => {
  
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 16,
              backgroundColor: appColors.white,
            }}>
            <Text
              style={{color: appColors.primaryColor}}
              onPress={() => navigation.goBack()}>
              Back
            </Text>
            <Text style={styles.headerText}>Session</Text>
          </View>
          <ScrollView style={{padding: 16}}>
            <View style={styles.sessionSelect}>
              <Text style={styles.sessionText}>2025-2026</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Session;
  
  const styles = StyleSheet.create({
    headerText: {
      color: appColors.black,
      fontWeight: '500',
      marginRight: 16,
      textAlign: 'center',
      flex: 1,
      fontSize: 16,
    },
    sessionSelect: {
      borderRadius: 4,
      borderBottomWidth:1,
      borderColor:appColors.lightGray ,
    },
    sessionText: {
      fontSize: 14,
      paddingVertical: 10,
    },
  });
  