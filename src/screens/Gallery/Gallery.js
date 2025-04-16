import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/color';
import {getImage} from '../../utils/getImages';
import {hitHomework} from '../../redux/GetHomeworkSlice';
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from '../../assets/svg/PlusIcon';
import {useIsFocused} from '@react-navigation/core';

const bookingImg = imageName => {
  const images = {
    booking: getImage('booking'),
    image1: getImage('booking'),
    image2: getImage('booking'),
    image3: getImage('booking'),
  };
  return images[imageName];
};


const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 72) / 3; // 2 columns + spacing

const Gallery = ({navigation, route}) => {
  const {classId,data} = route.params;


  const dispatch = useDispatch();
  const responseHomeWork = useSelector(state => state.getHomeworkReducer.data);

  const isFocused = useIsFocused();

  const [imageData, setImageData] = useState(null);

  // useEffect(() => {
  //   if (isFocused) {
  //     const payload = {
  //       classId: classId,
  //       type: 3,
  //     };
  //     dispatch(hitHomework(payload));
  //   }
  // }, [isFocused]);

  useEffect(() => {
    // if (responseHomeWork != null && responseHomeWork.status == 1) {
      setImageData(data.galleryMedia);
    // }
  }, []);

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
          <Text style={styles.headerText}>Gallery</Text>
        </View>
        {/* <Text style={{fontSize: 16, marginBottom: 10, fontWeight: '500'}}>
            Celebrations
          </Text>
          <Text style={{fontSize: 14, marginBottom: 10}}>
            abcdefghijklmnopqrstuvwxyz
          </Text>
          <Text style={{fontSize: 14, marginBottom: 10}}>
            abcdefghijklmnopqrstuvwxyz
          </Text> */}
        <View style={styles.imageChild}>
          {imageData != null && imageData.length>0 ? (
             <FlatList
             data={imageData}
             keyExtractor={(item, index) => index.toString()}
             numColumns={3}
             showsVerticalScrollIndicator={false}
             renderItem={({ item }) => (
               <TouchableOpacity style={styles.imageContainer} onPress={()=>navigation.navigate("ImageViewScreen",{image:item})}>
                 <Image
                   source={{ uri: item }}
                   style={styles.imageBox}
                   resizeMode="cover"
                 />
               </TouchableOpacity>
             )}
           />
          ) : (
            <Text>Empty Gallery</Text>
          )}
        </View>
    
      </View>
    </SafeAreaView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  headerText: {
    color: appColors.black,
    fontWeight: '500',
    marginRight: 16,
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
  },
  imageChild: {
    width: '100%',
    marginTop: 1,
    padding:16,
    backgroundColor:appColors.white,

    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  imageBox: {
    width: '100%',
    height: '100%',
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
