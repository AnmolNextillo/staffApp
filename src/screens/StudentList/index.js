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
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
//   import { hitMyClassMate } from '../../redux/MyClassMateSlice';
import HomeProfileIcon from '../../assets/svg/HomeProfileIcon';
import { hitAttendenceDetials } from '../../redux/GetAttendanceDetailsSlice';
import { hitUpdateAttendence } from '../../redux/UpdateAttendanceDetailsSlice';
import { clearMarkAttendance, hitMarkAttendance } from '../../redux/MarkFinalAttendanceSlice';
import { handleShowMessage } from '../../utils/Constants';

const StudentList = ({navigation,route}) => {

  const dispatch = useDispatch();

  const {classId} = route.params

  const [studentData, setStudentData] = useState(null)

  const responseAttendanceDetails = useSelector((state) => state.getAttendenceDetailsReducer.data)
  const responseUpdateAttendance = useSelector((state) => state.updateAttendenceReducer.data)
  const responseMarkAttendance = useSelector((state) => state.markAttendanceReducer.data)

  useEffect(() => {
    const payload = {
      _id:classId
    }
    dispatch(hitAttendenceDetials(payload))
  }, [])

  useEffect(() => {
    console.log("Response responseAttendanceDetails===> ",responseAttendanceDetails);
    if (responseAttendanceDetails != null && responseAttendanceDetails.status === 1) {
    
      setStudentData(responseAttendanceDetails.data)
    }
  }, [responseAttendanceDetails])

  // const studentData = [
  //   {id: '1', name: 'Jobanpreet Singh', photo: null},
  //   {id: '2', name: 'Inaaya Arora', photo: null},
  //   {id: '3', name: 'Aarav Thakur', photo: null},
  //   {id: '4', name: 'Viraaj', photo: null},
  //   {id: '5', name: 'Gurniwaz Singh Samagh', photo: null},
  //   {id: '1', name: 'Jobanpreet Singh', photo: null},
  //   {id: '2', name: 'Inaaya Arora', photo: null},
  //   {id: '3', name: 'Aarav Thakur', photo: null},
  //   {id: '4', name: 'Viraaj', photo: null},
  //   {id: '5', name: 'Gurniwaz Singh Samagh', photo: null},
  // ];

  const handleSubmit = () => {
    const payload = {
      id:classId
    }

    dispatch(hitMarkAttendance(payload))
  };

  const changeAttendance = (item) =>{
    const payload = {
      id:item._id,
      status:item.status==1?2:1
    }

    dispatch(hitUpdateAttendence(payload))
  }

  useEffect(()=>{
    console.log("responseUpdateAttendance ====> ",responseUpdateAttendance)
    if(responseUpdateAttendance!=null && responseUpdateAttendance.status == 1){
      const payload = {
        _id:classId
      }
      dispatch(hitAttendenceDetials(payload))
    }
  },[responseUpdateAttendance])

  useEffect(()=>{

    console.log("responseMarkAttendance ====> ",responseMarkAttendance)

    if(responseMarkAttendance!=null && responseMarkAttendance.status==1){
      handleShowMessage("Attendance Updated.","success")
      dispatch(clearMarkAttendance())
      navigation.goBack()
    
    }
  },[responseMarkAttendance])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {' '}
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
          <Text style={styles.headerText}>Student List</Text>
        </View>
        <View style={{padding: 16,flex:1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={studentData}
            style={{paddingBottom: 32}}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View
                style={{
                  backgroundColor: appColors.white,
                  flexDirection: 'row',
                  backgroundColor: appColors.white,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginTop: 8,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 16, textAlignVertical: 'top'}}>
                  {index + 1 + '.'}
                </Text>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 16,
                      fontWeight: '600',
                      color: appColors.primaryColor,
                    }}>
                    {item.studentId.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{alignItems: 'flex-start'}} onPress={()=>changeAttendance(item)}>
                      <Text
                        style={{
                          backgroundColor: item.status==1?appColors.success_green:appColors.red,
                          width: 80,
                          textAlign: 'center',
                          margin: 8,
                          color: appColors.white,
                          paddingVertical: 4,
                          borderRadius: 4,
                        }}>
                        {item.status==1?"Present":"Absent"}
                      </Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                  </View>
                </View>

                <View style={styles.profileImage}>
                  <HomeProfileIcon height={32} width={32} />
                </View>
              </View>
            )}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Mark Attendence</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StudentList;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    marginRight: 16,
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  columnSmall: {
    flex: 1,
  },
  columnLarge: {
    flex: 3,
  },
  columnMedium: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: appColors.lightGray,
  },
  profileImage: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: appColors.black,
    borderRadius: 6,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: appColors.primaryColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
