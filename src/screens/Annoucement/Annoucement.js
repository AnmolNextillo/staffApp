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
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from '../../assets/svg/PlusIcon';
import {announcementList} from '../../redux/GetAnnouncementListSlice';
import {useIsFocused, useNavigation} from '@react-navigation/core';

const Annoucement = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [announcement, setAnnouncement] = useState(null);
  const responseAnnouncementList = useSelector(
    state => state.announcementListReducer.data,
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(announcementList());
    }
  }, [isFocused]);

  useEffect(() => {
    console.log('responseAnnouncementList resp ===>', responseAnnouncementList);
    if (
      responseAnnouncementList != null &&
      responseAnnouncementList.status == 1
    ) {
      setAnnouncement(responseAnnouncementList.data);
    }
  }, [responseAnnouncementList]);

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
          <Text style={styles.headerText}>Annoucement</Text>
        </View>
        <ScrollView style={{padding: 16}} showsVerticalScrollIndicator={false}>
          {announcement != null &&
            announcement.map((item, index) => (
              <TouchableOpacity
                style={styles.testList}
                onPress={() =>
                  navigation.navigate('AnnoucementDetail', {data: item})
                }>
                <Text>
                  {index + 1}. {item.title} {'(' + item.classId.name + ')'}
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

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddAnnoucement')}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Annoucement;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    marginRight: 16,
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  imageBoxStyle: {
    height: '100%',
    width: '100%',
  },
  testList: {
    fontSize: 14,
    marginBottom: 16,
    padding: 16,
    backgroundColor: appColors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.primaryColor,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 20,
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
