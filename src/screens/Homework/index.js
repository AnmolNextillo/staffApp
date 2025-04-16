import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {appColors} from '../../utils/color';
import {useDispatch} from 'react-redux';
import {hitHomeWork} from '../../redux/HomeWorkSlice';
import moment from 'moment';

const Homework = ({navigation, route}) => {
  const {data} = route.params;

  console.log('Data ===> ', data);

  const openLink = fileUrl => {
    Linking.openURL(fileUrl).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

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
          <Text style={styles.headerText}>Homework Details</Text>
        </View>
        <ScrollView style={{padding: 16}}>
          <View
            style={{
              backgroundColor: appColors.white,
              padding: 16,
              borderRadius: 16,
            }}>
            <Text style={styles.schoolText}>{data.subject}</Text>
            {/* <Text style={{fontSize: 14, marginBottom: 8}}>
            <Text style={{fontWeight: '500'}}>Group : 
              </Text> abcdefghijklmnopqrstuvwxyz</Text> */}

            <Text style={styles.subjectText}>{data.description}</Text>
            <Text style={styles.subjectText}>
              <Text style={{fontWeight: '500'}}>Date : </Text>
              {moment(data.date).format('MMM D, YYYY')}
            </Text>
            <Text style={styles.LinkText}>Attachment Link</Text>
            <Text
              style={[styles.subjectText, {color: appColors.blue}]}
              onPress={() =>
                openLink(
                  'https://school-project-varun.s3.ap-south-1.amazonaws.com/' +
                    data.media,
                )
              }>
              https://school-project-varun.s3.ap-south-1.amazonaws.com/+
              {data.media}
            </Text>
            <Text style={styles.LinkText}>Link</Text>
            <Text style={styles.subjectText}>---</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Homework;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    marginRight: 16,
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  schoolText: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  subjectText: {
    fontSize: 14,
    marginBottom: 16,
  },
  LinkText: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
});
