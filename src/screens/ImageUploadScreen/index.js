import React, {use, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {appColors} from '../../utils/color';
import CrossIcon from '../../assets/svg/CrossIcon';
import {useDispatch, useSelector} from 'react-redux';
import {clearUploadFileData, uploadFile} from '../../redux/uploadFile';
import {hitGalleryMedia} from '../../redux/GalleryMediaSlice';
import {handleShowMessage} from '../../utils/Constants';
import {
  addAnnouncement,
  clearAddAnnouncementData,
} from '../../redux/AddAnnouncementSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const ImageUploadScreen = ({navigation, route}) => {
  const {classId} = route.params;
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [subject, setSubject] = useState([]);

  const dispatch = useDispatch();

  const resUploadImage = useSelector(state => state.uploadFileReducer.data);

  const responseAddAnnouncement = useSelector(
    state => state.addAnnouncementReducer.data,
  );

  const handleSelectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // 0 == unlimited selection
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          console.log('response.assets  ====> ', response.assets);
          if (images.length == 0) {
            setImages(response.assets);
          } else {
            setImages(prev => [...prev, ...response.assets]);
          }
        }
      },
    );
  };

  const uploadImages = () => {
    if(subject==""){
        handleShowMessage("Please enter title!",'danger')
    }else if(images.length==0){
        handleShowMessage("Please select images!",'danger')
    }
    else{
        images.map((item, index) => dispatch(uploadFile(item)));
    }
  };

  useEffect(() => {
    if (resUploadImage != null) {
      setUploadedImages(prev => [...prev, resUploadImage.Location]);
      //   uploadGalleryMedia();
    }
  }, [resUploadImage]);

  useEffect(() => {
    if (
      responseAddAnnouncement != null &&
      responseAddAnnouncement.status === 1
    ) {
      handleShowMessage('Succesfully Uploaded', 'success');
      dispatch(clearAddAnnouncementData());
      navigation.goBack();
    }
  }, [responseAddAnnouncement]);

  useEffect(() => {
    console.log(
      'images.length ===> ',
      images.length,
      ' uploadedImages.length ===> ',
      uploadedImages.length,
    );
    if (images.length == uploadedImages.length && resUploadImage != null) {
      const payload = {
        title: 'Gallery',
        classId: classId,
        subject:subject,
        galleryMedia: uploadedImages,
      };
      console.log('Payload Images ====> ', payload);
      dispatch(addAnnouncement(payload));
      dispatch(clearUploadFileData());
    }
  }, [uploadedImages]);

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerText}>Upload Images</Text>
      </View>
      {/* <Text style={styles.title}>Upload Multiple Images</Text> */}
   
      <View style={{width:"100%",backgroundColor:appColors.white,paddingHorizontal:16,marginTop:1}}>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            value={subject}
            onChangeText={setSubject}
          />
        </View>
      <ScrollView contentContainerStyle={styles.imageContainer}>

        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <TouchableOpacity
              style={styles.crossIcon}
              onPress={() => {
                const updatedImages = images.filter((_, i) => i !== index);
                setImages(updatedImages);
              }}>
              <CrossIcon height={12} width={12} />
            </TouchableOpacity>
            <Image source={{uri: img.uri}} style={styles.imageThumb} />
          </View>
        ))}
      </ScrollView>
      <View style={{backgroundColor:appColors.white}}>
      <TouchableOpacity
        style={[
          styles.uploadButton,
          {marginBottom: images.length > 0 ? 0 : 16},
        ]}
        onPress={handleSelectImages}>
        <Text style={styles.uploadText}>Select Images</Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <TouchableOpacity
          style={[styles.uploadButton, {marginBottom: 16}]}
          onPress={uploadImages}>
          <Text style={styles.uploadText}>Upload Images</Text>
        </TouchableOpacity>
      )}
      </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: appColors.grey,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: appColors.primaryColor,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex:1,
    gap: 10,
    padding:16,
    paddingBottom: 32,
    backgroundColor:appColors.white
  },
  imageThumb: {
    backgroundColor: appColors.offWhite,
    width: 130,
    height: 130,
    borderRadius: 8,
    margin: 5,
  },
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    marginRight: 16,
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },

  imageWrapper: {
    position: 'relative',
    margin: 5,
    backgroundColor: appColors.offWhite,
    borderRadius: 12,
    overflow: 'hidden',
  },
  crossIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 8,
  },
  //   imageThumb: {
  //     width: 100,
  //     height: 100,
  //     borderRadius: 12,
  //   },
});

export default ImageUploadScreen;
