import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/color';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {hitTests} from '../../redux/GetTestsSlice';
import PlusIcon from '../../assets/svg/PlusIcon';

const Test = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const responseTests = useSelector(state => state.getTestsReducer.data);

  const [tests, setTest] = useState(null);

  useEffect(() => {
    if (isFocused) {
      dispatch(hitTests());
    }
  }, [isFocused]);

  useEffect(() => {
    console.log('responseTests test ===>', responseTests);
    if (responseTests != null && responseTests.status == 1) {
      setTest(responseTests.data);
    }
  }, [responseTests]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            backgroundColor: appColors.white,
          }}>
          {/* <Text
            style={{color: appColors.primaryColor}}
            onPress={() => navigation.goBack()}>
            Back
          </Text> */}
          <Text style={styles.headerText}>Tests</Text>
        </View>
        <ScrollView style={{padding: 16}}>
          {tests != null &&
            tests.map((item, index) => (
              <TouchableOpacity
                style={styles.testList}
                onPress={() => navigation.navigate('TestDetail', {data: item})}>
                <Text>
                  {index + 1}. {item.title} {'(' + item.subjectId.name + ')'}
                </Text>
                <Text style={{marginTop: 8, fontWeight: '500'}}>
                  Class : {item.classId.name}
                </Text>
                <Text style={{marginTop: 8, color: appColors.grey}}>
                  Date : {item.date}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTest')}>
          {/* <Text style={{color:appColors.white,fontSize:36}}>+</Text> */}
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  testList: {
    fontSize: 14,
    marginBottom: 8,
    padding: 16,
    backgroundColor: appColors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.primaryColor,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 96,
    backgroundColor: appColors.primaryColor,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
});
