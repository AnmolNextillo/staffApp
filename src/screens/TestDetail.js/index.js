import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/color';
import {useDispatch, useSelector} from 'react-redux';
// import { clearAckTest, hitAckTest } from '../../redux/AcknowladgeTestSlice';
import {handleShowMessage} from '../../utils/Constants';
import {hitTestDetail} from '../../redux/GetTestDetailSlice';

const TestDetail = ({navigation, route}) => {
  const {data} = route.params;

  const [testData, setTestData] = useState(null);
  const dispatch = useDispatch();
  const responseTestDetails = useSelector(
    state => state.getTestDetailReducer.data,
  );
  // const responseAck= useSelector((state)=>state.ackTestReducer.data)

  console.log('Test Data ===> ', data);

  useEffect(() => {
    const payload = {
      _id: data._id,
    };
    dispatch(hitTestDetail(payload));
  }, []);

  useEffect(() => {
    console.log('responseTestDetails ===> ', responseTestDetails);
    if (responseTestDetails != null && responseTestDetails.status === 1) {
      setTestData(responseTestDetails.data);
    }
  }, [responseTestDetails]);

  const openLink = fileUrl => {
    console.log(fileUrl);
    Linking.openURL(
      'https://school-project-varun.s3.ap-south-1.amazonaws.com/' + fileUrl,
    ).catch(err => console.error('Failed to open URL:', err));
  };

  // const onAckClick = () =>{
  //   const payload = {
  //     testId:testData._id
  //   }

  //   console.log("Payload ===> ",payload)

  //   dispatch(hitAckTest(payload))
  // }

  // useEffect(()=>{
  //   if(responseAck!=null && responseAck.status == 1){
  //     navigation.goBack()
  //     dispatch(clearAckTest())
  //   }
  // },[])

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
        <TouchableOpacity
          style={styles.viewStyle}
          // onPress={() => navigation.navigate('AddTest', {data: testData})}
          >
          <Text style={{fontWeight: '600'}}>
            Date: {testData != null && testData.date}
          </Text>
          <Text style={{fontWeight: '400', marginTop: 8}}>
            Total Marks:{' '}
            <Text style={{fontWeight: '600'}}>
              {testData != null && testData.totalMarks}
            </Text>
          </Text>
          <Text style={{fontWeight: '400', marginTop: 8}}>
            Obtain Marks:{' '}
            <Text style={{fontWeight: '600'}}>
              {testData != null && testData.obtainedMarks}
            </Text>
          </Text>
          <View
            style={{
              fontWeight: '400',
              marginTop: 8,
              flexDirection: 'row',
              marginRight: 16,
            }}>
            <Text>Link:</Text>
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => openLink(testData != null && testData.media)}>
              <Text style={{color: appColors.blue, marginLeft: 8}}>
                {testData != null && testData.media}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.acknowladgeStyle} onPress={()=>testData!=null&&testData.isReviewedByParent==0?onAckClick():handleShowMessage("Test already acknowladged.","success")}>
            <Text style={{color:appColors.white}}>{testData!=null&&testData.isReviewedByParent==0?"Acknowledge":"Acknowledged"}</Text>
          </TouchableOpacity> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TestDetail;

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
