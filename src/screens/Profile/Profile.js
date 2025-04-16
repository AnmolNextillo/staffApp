import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../utils/color';
import SessionIcon from '../../assets/svg/SessionIcon';
import ChangePasswordIcon from '../../assets/svg/ChangePasswordIcon';
import { getImage } from '../../utils/getImages';
import DemoIcon from '../../assets/svg/DemoIcon';
import LogoutIcon from '../../assets/svg/LogoutIcon';
import HomeProfileIcon from '../../assets/svg/HomeProfileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { clearLogoutData, hitLogout } from '../../redux/LogoutSlice';
import { hitProfile } from '../../redux/GetProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {

    const dispatch = useDispatch()

    const responseLogout = useSelector((state) => state.logoutReducer.data) 
    const responseProfile = useSelector((state) => state.getProfileReducer.data) 

    const [profileData,setProfileData] = useState(null)

    useEffect(()=>{
      dispatch(hitProfile())
    },[])

    useEffect(()=>{
      if(responseProfile!=null && responseProfile.status == 1){
        setProfileData(responseProfile.data)
      }
    },[responseProfile])

    const onLogoutClick = () =>{
      dispatch(hitLogout())

    }

    const clearLocalData= async() =>{
      await AsyncStorage.clear()
      navigation.navigate("Login")
      dispatch(clearLogoutData())
    }

    useEffect(()=>{
      if(responseLogout!=null && responseLogout.status === 1){
        clearLocalData()
      }
    },[responseLogout])

    return (
        <SafeAreaView style={styles.containerStyle}>
            <ScrollView
                style={styles.containerStyle}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.profileImage}>
                            <HomeProfileIcon style={{ fill: appColors.white }} />
                        </View>
                        <Text style={styles.userName}>
                          {profileData!=null&&profileData.name}
                            {/* {profileData != null ? profileData.name : ""} */}
                        </Text>
                        {/* <Text style={styles.admissionText}>Class : 1st
                            {profileData != null ? profileData.classId.name : ""}
                        </Text> */}
                        {/* <Text style={styles.admissionText}>Profile</Text> */}
                    </View>
                </View>
                <View style={styles.CardTopStyle}>
                    <Text style={styles.AcademicText}>Settings</Text>
                    <View style={styles.CardStyle}>
                        <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('Session')}>
                            <SessionIcon />
                            <Text style={styles.cardNameStyle}>Session</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardBox} onPress={() => navigation.navigate('ChangePassword')}>
                            <ChangePasswordIcon />
                            <Text style={styles.cardNameStyle}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardBox}>
                            <Image
                                source={getImage('booking')}
                                style={styles.imageBoxStyle}
                                resizeMode="contain"
                            />{' '}
                            <Text style={styles.cardNameStyle}>Privacy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.CardStyleLeft}>
                        <TouchableOpacity style={styles.cardBoxLeft}>
                            <DemoIcon />
                            <Text style={styles.cardNameStyle}>Demo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardBoxLeft}
                        onPress={() => onLogoutClick()}
                        >
                            <LogoutIcon />
                            <Text style={styles.cardNameStyle}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: appColors.offWhite,
        paddingBottom: 60,
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
        paddingBottom: 0
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
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: appColors.white,
        marginBottom: 12,
        width: '30%',
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
    },
    imageBoxStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: 40,
        width: 40,
    },
    CardStyleLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 12,
        gap: 12,
        width: '100%'
    },
    cardBoxLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.white,
        marginBottom: 12,
        width: '31%',
        paddingHorizontal: 4,
        paddingVertical: 20,
        borderRadius: 8,
        boxShadow: ' -2px 2px 14px 0px rgb(245, 242, 242)',
        alignSelf: 'flex-start',
    },
})