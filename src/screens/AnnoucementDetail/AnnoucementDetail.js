import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/color';
import {useDispatch, useSelector} from 'react-redux';
import {getAnnouncementDetail} from '../../redux/GetAnnouncementDetailSlice';

const AnnoucementDetail = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();

  const [announcementData, setAnnouncementData] = useState(null);
  const responseAnnouncementDetail = useSelector(
    state => state.getAnnouncementDetailReducer.data,
  );

  console.log('annocementDetails Data ===> ', data);

  useEffect(() => {
    const payload = {
      _id: data._id,
    };
    dispatch(getAnnouncementDetail(payload));
  }, []);

  useEffect(() => {
    console.log(
      'responseAnnouncementDetail re===> ',
      responseAnnouncementDetail,
    );
    if (
      responseAnnouncementDetail != null &&
      responseAnnouncementDetail.status === 1
    ) {
      setAnnouncementData(responseAnnouncementDetail.data);
    }
  }, [responseAnnouncementDetail]);

  // const openLink = (fileUrl) => {
  //     console.log(fileUrl)
  //     Linking.openURL("https://school-project-varun.s3.ap-south-1.amazonaws.com/" + fileUrl).catch((err) => console.error("Failed to open URL:", err));
  // };

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
          <Text style={styles.headerText}>{data.title}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={{fontWeight: '600'}}>
            Title: {announcementData != null && announcementData.title}
          </Text>
          <Text style={{fontWeight: '400', marginTop: 8}}>
            Subject:{' '}
            <Text style={{fontWeight: '600'}}>
              {announcementData != null && announcementData.subject}
            </Text>
          </Text>
          <Text style={{fontWeight: '400', marginTop: 8}}>
            Description :{' '}
            <Text style={{fontWeight: '600'}}>
              {announcementData != null && announcementData.description}
            </Text>
          </Text>
          <Text style={{fontWeight: '400', marginTop: 8}}>
            Date :{' '}
            <Text style={{fontWeight: '600'}}>
              {announcementData != null && announcementData.date}
            </Text>
          </Text>
          {/* <View style={{ fontWeight: '400', marginTop: 8, flexDirection: 'row', marginRight: 16 }}>
                        <Text>Link:</Text>
                        <TouchableOpacity style={{ marginRight: 16 }} onPress={() => openLink(announcementData != null && announcementData.media)}>
                            <Text style={{ color: appColors.blue, marginLeft: 8 }}>
                                {announcementData != null && announcementData.media}
                            </Text>
                        </TouchableOpacity>
                    </View> */}
          {/* <TouchableOpacity style={styles.acknowladgeStyle} onPress={()=>announcementData!=null&&announcementData.isReviewedByParent==0?onAckClick():handleShowMessage("Test already acknowladged.","success")}>
              <Text style={{color:appColors.white}}>{announcementData!=null&&announcementData.isReviewedByParent==0?"Acknowledge":"Acknowledged"}</Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AnnoucementDetail;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    marginRight: 16,
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  viewStyle: {
    backgroundColor: appColors.white,
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  acknowladgeStyle: {
    padding: 8,
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: appColors.primaryColor,
    alignItems: 'center',
    borderRadius: 16,
  },
});
