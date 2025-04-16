import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/color';
import {useDispatch, useSelector} from 'react-redux';
import {hitClassList} from '../../redux/GetClassListSlice';

const ClassList = ({navigation,route}) => {
  const dispatch = useDispatch();

  const {from} = route.params

  const responseClassList = useSelector(state => state.getClassReducer.data);

  const [classList, setClassList] = useState(null);

  useEffect(() => {
    dispatch(hitClassList());
  }, []);

  useEffect(() => {
    if (responseClassList != null && responseClassList.status === 1) {
      setClassList(responseClassList.data);
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
        <Text
          style={{color: appColors.primaryColor}}
          onPress={() => navigation.goBack()}>
          Back
        </Text>
        <Text style={styles.headerText}>Class List</Text>
      </View>

      <FlatList
        data={classList}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.classStyle}
            onPress={() => navigation.navigate(from==1?'HomeWorkList':from==2?"EventList":"GallerySubjectList",{classId:item._id})}>
            <Text style={styles.textStyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ClassList;

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
    marginTop:16,
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
