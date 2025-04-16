import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/color';
import {useDispatch, useSelector} from 'react-redux';
import {hitClassList} from '../../redux/GetClassListSlice';
import { hitAttendence } from '../../redux/GetAttendenceSlice';

const Attendence = ({navigation}) => {
  const dispatch = useDispatch();
  const responseClassList = useSelector(state => state.getAttendenceReducer.data);

  const [classList, setClassList] = useState(null);

  useEffect(() => {
    dispatch(hitAttendence());
  }, []);

  useEffect(() => {
    if (responseClassList != null && responseClassList.status === 1) {
      const classList = responseClassList.data.map(item => ({
        name: item.classId.name,
        id: item._id,
      }));
      setClassList(classList);
    }
  }, [responseClassList]);

  return (
    <SafeAreaView style={{flex: 1}}>
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
        <Text style={styles.headerText}>Class List</Text>
      </View>
      {/* <ScrollView style={{flex: 1,marginBottom:80}}>
        {classList != null &&
          classList.map((item, index) => (
           
          ))} */}
      <View style={{flex: 1, marginBottom: 80}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 16}}
          data={classList}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={styles.classStyle}
              onPress={() => navigation.navigate('StudentList',{classId:item.id})}>
              <Text style={styles.textStyle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Attendence;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  classStyle: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: appColors.white,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: appColors.primaryColor,
  },
  textStyle: {
    color: appColors.primaryColor,
    fontSize: 16,
  },
});
