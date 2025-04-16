import {
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
import HomeProfileIcon from '../../assets/svg/HomeProfileIcon';
import HomeworkIcon from '../../assets/svg/HomeworkIcon';
import AnnoucementIcon from '../../assets/svg/AnnoucementIcon';
import EventIcon from '../../assets/svg/EventIcon';
import {hitProfile} from '../../redux/GetProfileSlice';
import {useDispatch, useSelector} from 'react-redux';
import GalleryIcon from '../../assets/svg/GalleryIcon';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const responseProfile = useSelector(state => state.getProfileReducer.data);

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    dispatch(hitProfile());
  }, []);

  useEffect(() => {
    if (responseProfile != null && responseProfile.status == 1) {
      setProfileData(responseProfile.data);
    }
  }, [responseProfile]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <ScrollView
        style={styles.containerScrollStyle}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerStyle}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.profileImage}>
              <HomeProfileIcon style={{fill: appColors.white}} />
            </View>
            <Text style={styles.userName}>
              {profileData!=null&&profileData.name}
              {/* {profileData!=null?profileData.name:""} */}
            </Text>
            {/* <Text style={styles.admissionText}>
              Class : 1st
            </Text> */}
            {/* <Text style={styles.admissionText}>Parent</Text> */}
          </View>
        </View>
        <View style={styles.CardTopStyle}>
          <Text style={styles.AcademicText}>Academics</Text>
          <View style={styles.CardStyle}>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('Annoucement')}>
              <View style={styles.imageBoxStyle}>
                <AnnoucementIcon />
              </View>
              <Text style={styles.cardNameStyle}>Annoucement</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('ClassList', {from: 1})}>
              <HomeworkIcon />
              <Text style={styles.cardNameStyle}>HomeWork</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.CardStyle}>
            <TouchableOpacity
              style={styles.eventsCard}
              onPress={() => navigation.navigate('ClassList', {from: 2})}>
              <EventIcon />
              <Text style={styles.cardNameStyle}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardBox}
              onPress={() => navigation.navigate('ClassList', {from: 3})}>
              <GalleryIcon/>
              <Text style={styles.cardNameStyle}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.offWhite,
    paddingBottom: 80,
  },
  containerScrollStyle: {
    flex: 1,
    backgroundColor: appColors.offWhite,
  },
  headerStyle: {
    backgroundColor: appColors.bgBlack,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileImage: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: appColors.white,
    borderRadius: 6,
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    marginBottom: 6,
    color: appColors.primaryColor,
    fontWeight: '500',
  },
  admissionText: {
    fontSize: 16,
    marginBottom: 4,
    color: appColors.white,
    fontWeight: '300',
  },
  CardTopStyle: {
    padding: 16,
    paddingBottom: 0,
  },
  AcademicText: {
    fontSize: 16,
    marginBottom: 14,
    fontWeight: '500',
  },
  CardStyle: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  cardBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: appColors.white,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 20,
    borderRadius: 8,
    boxShadow: ' -2px 2px 14px 0px rgb(245, 242, 242)',
  },
  eventsCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: appColors.white,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 20,
    borderRadius: 8,
    boxShadow: ' -2px 2px 14px 0px rgb(245, 242, 242)',
  },
  cardNameStyle: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: appColors.primaryColor,
  },
  imageBoxStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 40,
    width: 40,
  },
  // cardBoxLeft: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: appColors.white,
  //   marginBottom: 12,
  //   width: '31%',
  //   paddingHorizontal: 4,
  //   paddingVertical: 20,
  //   borderRadius: 8,
  //   boxShadow: ' -2px 2px 14px 0px rgb(245, 242, 242)',
  //   alignSelf: 'flex-start',
  // },
});
