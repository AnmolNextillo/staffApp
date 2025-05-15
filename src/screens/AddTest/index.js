import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../utils/color';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { clearAddTest, hitAddTest } from '../../redux/AddTestSlice';
import { hitSubjectList } from '../../redux/GetSujectListSlice';
import { hitClassList } from '../../redux/GetClassListSlice';
import AnnualCalenderIcon from '../../assets/svg/AnnualCalenderIcon';
import { handleShowMessage } from '../../utils/Constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { clearUploadFileData, uploadFile } from '../../redux/uploadFile';
import BottomListModal from '../../component/BottomListModal';
import BottomListSubject from '../../component/BottomListSubject';

const AddTest = ({ route }) => {

  const passedData = route?.params?.data;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const responseSubject = useSelector(state => state.getSubjectReducer.data);
  const responseClasses = useSelector(state => state.getClassReducer.data);
  const responseAddTest = useSelector(state => state.addTestReducer.data);
  const responseUploadFile = useSelector(state => state.uploadFileReducer.data);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [classList, setClassList] = useState(null);
  const [subjectList, setSubjectList] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisibleSub, setMenuVisibleSub] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (passedData) {
      setTitle(passedData.title || '');
      setDate(passedData.date || '');
      setTotalMarks(String(passedData.totalMarks || ''));
      setDescription(passedData.description || '');
      setImageUri(passedData.media ? { uri: `https://school-project-varun.s3.ap-south-1.amazonaws.com/${passedData.media}` } : null);

      if (passedData.classId) {
        setSelectedClass(passedData.classId);
      }

      if (passedData.subjectId) {
        setSubject(passedData.subjectId);
      }
    }
  }, [passedData]);

  useEffect(() => {
    dispatch(hitClassList());
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const payload = { classId: selectedClass };
      dispatch(hitSubjectList(payload));
    }
  }, [selectedClass]);

  useEffect(() => {
    if (responseClasses && responseClasses.status === 1) {
      setClassList(responseClasses.data);
      setSelectedClass(responseClasses.data[0]._id);
      setClassName(responseClasses.data[0].name); 
    }
  }, [responseClasses]);

  useEffect(() => {
    if (responseSubject && responseSubject.status === 1) {
      setSubjectList(responseSubject.data);
      setSubject(responseSubject.data[0])
    }
  }, [responseSubject]);

  const handleSubmit = () => {
    if (title && subject && date && selectedClass && totalMarks) {
      if (imageUri != null) {
        dispatch(uploadFile(imageUri));
      } else {
        const payload = {
          title: title,
          subjectId: subject,
          date: date,
          classId: selectedClass,
          media: '',
          totalMarks: totalMarks,
        };
        console.log('Payload Add Test ====> ', payload);
        dispatch(hitAddTest(payload));
      }
    } else {
      // Alert.alert('Error', 'Please fill in all fields');
      handleShowMessage('Please fill in all fields', 'danger');
    }
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    if (responseAddTest != null && responseAddTest.status === 1) {
      handleShowMessage('Test added successfully', 'success');
      navigation.goBack();
      dispatch(clearAddTest());
    } else {
      if (responseAddTest != null) {
        // handleShowMessage(responseAddTest.message, 'danger');
      }
    }
  }, [responseAddTest]);
  useEffect(() => {
    console.log("responseUploadFile  ====> ", responseUploadFile)
    if (responseUploadFile != null) {
      if (title && subject && date && selectedClass && totalMarks) {
        console.log("Inner")
        const payload = {
          title: title,
          subjectId: subject,
          date: date,
          classId: selectedClass,
          media: responseUploadFile.Location,
          totalMarks: totalMarks,
        };
        console.log('Payload Add Test ====> ', payload);
        dispatch(hitAddTest(payload));
        dispatch(clearUploadFileData())
      } else {
        console.log("Else")
        // Alert.alert('Error', 'Please fill in all fields');
        handleShowMessage('Please fill in all fields', 'danger');
      }
    } else {
      if (responseUploadFile != null) {
        // handleShowMessage(responseUploadFile.message, 'danger');
      }
    }
  }, [responseUploadFile]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            backgroundColor: appColors.white,
          }}>
          <Text
            style={{ color: appColors.primaryColor }}
            onPress={() => navigation.goBack()}>
            Back
          </Text>
          <Text style={styles.headerText}>Add Test</Text>
        </View>
        <ScrollView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Test Title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Class Picker */}
          {/* <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedClass}
              style={styles.picker}
              onValueChange={itemValue => setSelectedClass(itemValue)}>
              {classList?.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.name}
                  value={item._id}
                />
              ))}
            </Picker>
          </View> */}

          <BottomListModal
            isModalVisible={menuVisible}
            setModalVisible={setMenuVisible}
            data={classList}
            setSelectedClass={setSelectedClass}
            setClassName={setClassName}
            className={className}
            from="class"
          />

          <BottomListSubject
            isModalVisible={menuVisibleSub}
            setModalVisible={setMenuVisibleSub}
            subjectData={subjectList}
            setSubject={setSubject}
            setClassName={setSubject}
            className={subject}
            from="subject"
          />

          {/* {subjectList?.length > 0 && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={subject}
              style={styles.picker}
              onValueChange={itemValue => setSubject(itemValue)}>
              {subjectList?.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.name}
                  value={item._id}
                />
              ))}
            </Picker>
          </View>
          )} */}

          {/* Date Picker */}
          <View
            style={[
              styles.input,
              { flexDirection: 'row', alignContent: 'center' },
            ]}>
            <Text
              style={{ color: date ? appColors.black : appColors.grey, flex: 1 }}>
              {date || 'Select Date'}
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <AnnualCalenderIcon height={24} width={24} />
            </TouchableOpacity>
          </View>
          {/* {showDatePicker && (
            <DateTimePicker
              value={date ? new Date(date) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  const formattedDate = selectedDate
                    .toISOString()
                    .split('T')[0]; // YYYY-MM-DD
                  setDate(formattedDate);
                }
              }}
            />
          )} */}

          {showDatePicker && Platform.OS === 'ios' && (
            <Modal transparent={true} animationType="slide">
              <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000088' }}>
                <View style={{ backgroundColor: 'white', padding: 16 }}>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setTempDate(selectedDate); // Store temporarily until OK is pressed
                      }
                    }}
                  />
                  <Button
                    title="OK"
                    onPress={() => {
                      setShowDatePicker(false);
                      if (tempDate) {
                        const formattedDate = tempDate.toISOString().split('T')[0];
                        setDate(formattedDate);
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>
          )}

          <TextInput
            style={styles.input}
            placeholder="Total Marks"
            value={totalMarks}
            keyboardType="numeric"
            onChangeText={setTotalMarks}
          />
          {/* Description */}
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={handleImagePick}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image
              source={{ uri: imageUri.uri }}
              style={styles.imagePreview}
              resizeMode="center"
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Test</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTest;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 16,
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: appColors.white,
    margin: 16,
    borderRadius: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: appColors.grey,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    textAlignVertical: 'top',
  },
  descriptionInput: {
    height: 80,
  },
  picker: {
    width: '100%',
  },
  pickerContainer: {
    borderRadius: 16,
    backgroundColor: appColors.white,
    borderColor: appColors.grey,
    borderWidth: 1,
    marginTop: 12,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: appColors.primaryColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32
  },
  buttonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageUploadButton: {
    backgroundColor: appColors.primaryColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
});
