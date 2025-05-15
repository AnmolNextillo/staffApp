import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
import { launchImageLibrary } from 'react-native-image-picker';
import {
  addAnnouncement,
  clearAddAnnouncementData,
} from '../../redux/AddAnnouncementSlice';
import { clearUploadFileData, uploadFile } from '../../redux/uploadFile';
import { hitClassList } from '../../redux/GetClassListSlice';
import { hitSubjectList } from '../../redux/GetSujectListSlice';
import { handleShowMessage } from '../../utils/Constants';
import AnnualCalenderIcon from '../../assets/svg/AnnualCalenderIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomListModal from '../../component/BottomListModal';
import BottomListSubject from '../../component/BottomListSubject';

const AddEvent = () => {

  // const item = route?.params?.data;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisibleSub, setMenuVisibleSub] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [classList, setClassList] = useState(null);
  const [subjectList, setSubjectList] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [className, setClassName] = useState('');
  const [tempDate, setTempDate] = useState(new Date());

  const responseSubject = useSelector(state => state.getSubjectReducer.data);
  const responseClasses = useSelector(state => state.getClassReducer.data);
  const responseAddAnnouncement = useSelector(
    state => state.addAnnouncementReducer.data,
  );
  const responseUploadFile = useSelector(state => state.uploadFileReducer.data);

  //  useEffect(() => {
  //     if (item) {
  //       setTitle(item.title || '');
  //       setDate(item.date || '');
  //       setDescription(item.description || '');
  //       setImageUri(item.media ? { uri: `https://school-project-varun.s3.ap-south-1.amazonaws.com/${item.media}` } : null);

  //       if (item.classId) {
  //         setSelectedClass(item.classId);
  //       }

  //       if (item.subjectId) {
  //         setSubject(item.subjectId);
  //       }
  //     }
  //   }, [item]);

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
      setSelectedClass(responseClasses.data[0]._id);
      setClassList(responseClasses.data);
      setClassName(responseClasses.data[0].name);
    }
  }, [responseClasses]);

  useEffect(() => {
    if (responseSubject && responseSubject.status === 1) {
      setSubjectList(responseSubject.data);
      setSubject(responseSubject.data[0]);
    }
  }, [responseSubject]);

  // useEffect(() => {
  //     console.log("responseAddAnnouncement response===> ", responseAddAnnouncement)
  //     if (responseAddAnnouncement != null && responseAddAnnouncement.status === 1) {
  //         dispatch(uploadFile(imageUri));
  //         dispatch(clearAddAnnouncementData());
  //         Alert.alert('Success', 'Homework added successfully');
  //     }
  // }, [responseAddAnnouncement])

  const handleSubmit = () => {
    if (subject && date && selectedClass) {
      if (imageUri != null) {
        dispatch(uploadFile(imageUri));
      } else {
        const payload = {
          title: "Event",
          subjectId: subject,
          date: date,
          description: description,
          classId: selectedClass,
          // type: 2,
        };
        console.log('payload data add annouement===>', payload);
        dispatch(addAnnouncement(payload));
      }
    } else {
      handleShowMessage('Please fill in all fields', 'danger');
    }
  };

  const handleImagePick = () => {
    console.log('launchImageLibrary ===>', launchImageLibrary);
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    if (
      responseAddAnnouncement != null &&
      responseAddAnnouncement.status === 1
    ) {
      handleShowMessage('Event added successfully', 'success');
      navigation.goBack();
      dispatch(clearAddAnnouncementData());
      dispatch(clearUploadFileData());
    } else {
      if (responseAddAnnouncement != null) {
        handleShowMessage(responseAddAnnouncement.message, 'danger');
      }
    }
  }, [responseAddAnnouncement]);

  useEffect(() => {
    if (responseUploadFile != null && responseUploadFile.status === 1) {
      if (subject && date && selectedClass) {
        const payload = {
          title: "Event",
          subjectId: subject,
          date: date,
          classId: selectedClass,
          media: responseUploadFile.Location,
          ddescription: description,
        };
        console.log('Payload Add Test ====> ', payload);
        dispatch(addAnnouncement(payload));
      } else {
        // Alert.alert('Error', 'Please fill in all fields');
        handleShowMessage('Please fill in all fields', 'danger');
      }
    } else {
      if (responseUploadFile != null) {
        handleShowMessage(responseUploadFile.message, 'danger');
      }
    }
  }, [responseUploadFile]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>
            Back
          </Text>
          <Text style={styles.headerText}>Add Event</Text>
        </View>
        <ScrollView style={styles.inputContainer}>
          {/* <TextInput style={styles.input} placeholder="Event Title" value={title} onChangeText={setTitle} /> */}

          <BottomListModal
            isModalVisible={menuVisible}
            setModalVisible={setMenuVisible}
            data={classList}
            setSelectedClass={setSelectedClass}
            setClassName={setClassName}
            className={className}
            from="class"
          />

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
                  value={item.name}
                />
              ))}
            </Picker>
          </View>
          )}       */}

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
            <Image source={{ uri: imageUri.uri }} style={styles.imagePreview} />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Add Event</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: appColors.white,
  },
  backText: {
    color: appColors.primaryColor,
  },
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
  pickerContainer: {
    borderRadius: 16,
    backgroundColor: appColors.white,
    borderColor: appColors.grey,
    borderWidth: 1,
    marginTop: 12,
  },
  // picker: {
  //     borderWidth: 1,
  // },
  button: {
    backgroundColor: appColors.primaryColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
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
