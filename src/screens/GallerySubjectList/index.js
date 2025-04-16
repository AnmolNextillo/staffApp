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
import {useIsFocused} from '@react-navigation/core';
import { hitHomework } from '../../redux/GetHomeworkSlice';
import PlusIcon from '../../assets/svg/PlusIcon';

const GallerySubjectList = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {classId} = route.params;

  const responseHomeWork = useSelector(state => state.getHomeworkReducer.data);

  const isFocused = useIsFocused();

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (isFocused) {
      const payload = {
        classId: classId,
        type: 3,
      };
      dispatch(hitHomework(payload));
    }
  }, [isFocused]);

  useEffect(() => {
    if (responseHomeWork != null && responseHomeWork.status == 1) {
      setImageData(responseHomeWork.data);
    }
  }, [responseHomeWork]);

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
        data={imageData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.classStyle}
            onPress={() =>
              navigation.navigate(
               'Gallery',{data:item,classId:classId}
              )
            }>
            <Text style={styles.textStyle}>{item.subject}</Text>
          </TouchableOpacity>
        )}
      />
        <TouchableOpacity
                style={styles.fab}
                onPress={() =>
                  navigation.navigate('ImageUploadScreen', {classId: classId})
                }>
                {/* <Text style={{color:appColors.white,fontSize:36}}>+</Text> */}
                <PlusIcon />
              </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GallerySubjectList;

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
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: appColors.primaryColor,
  },
  textStyle: {
    color: appColors.primaryColor,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
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
