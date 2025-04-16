import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {appColors} from '../../utils/color';
  import {handleShowMessage} from '../../utils/Constants';
  import { useDispatch, useSelector } from 'react-redux';
import { clearChangePassword, hitChangePassword } from '../../redux/ChangePasswordSlice';
  
  const ChangePassword = ({navigation}) => {
  
    const dispatch = useDispatch()
  
    const responseChangePassword = useSelector((state) =>state.changePasswordReducer.data)
  
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const onChangeClick = () => {
      if (oldPassword.length === 0) {
        handleShowMessage('Please enter old password!', 'danger');
      } else if (newPassword.length === 0) {
        handleShowMessage('Please enter new password!', 'danger');
      } else if (confirmPassword.length === 0) {
        handleShowMessage('Please enter confirm password!', 'danger');
      } else if (newPassword !== confirmPassword) {
        handleShowMessage('Confirm password not matched!', 'danger');
      } else {
        const payload = {
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
        dispatch(hitChangePassword(payload))
      }
    };
  
    useEffect(()=>{
        console.log("Response Change Password ===> ",responseChangePassword)
      if(responseChangePassword!=null && responseChangePassword.status===1){
        handleShowMessage("Password changed successfully.","success")
        dispatch(clearChangePassword())
        navigation.goBack()
      }
      else{
        if(responseChangePassword!=null){
          handleShowMessage(responseChangePassword.message,"danger")
          dispatch(clearChangePassword())
        }
      }
    },[responseChangePassword])
  
  
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
            <Text style={styles.headerText}>Change Password</Text>
          </View>
          <ScrollView style={{padding: 16}}>
            <View style={styles.textInputStyle}>
              <TextInput
                placeholder="Old Pasword"
                style={{
                  width: '100%',
                  marginLeft: 4,
                  color: appColors.black,
                }}
                value={oldPassword}
                onChangeText={value => setOldPassword(value)}
              />
            </View>
            <View style={styles.textInputStyle}>
              <TextInput
                placeholder="New Pasword"
                style={{
                  width: '100%',
                  marginLeft: 4,
                  color: appColors.black,
                }}
                value={newPassword}
                onChangeText={value => setNewPassword(value)}
              />
            </View>
            <View style={styles.textInputStyle}>
              <TextInput
                placeholder="Confirm Pasword"
                style={{
                  width: '100%',
                  marginLeft: 4,
                  color: appColors.black,
                }}
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
              />
            </View>
            <TouchableOpacity style={styles.changePasswordButtonViewStyle} onPress={()=>onChangeClick()}>
              <Text style={styles.changePasswordButtonStyle}>Change Password</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ChangePassword;
  
  const styles = StyleSheet.create({
    headerText: {
      color: appColors.black,
      fontWeight: '500',
      marginRight: 16,
      textAlign: 'center',
      flex: 1,
      fontSize: 16,
    },
    textInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: appColors.grey,
        borderRadius: 8,
        marginVertical: 10,
        height: 45,
        paddingHorizontal: 8,
    },
    changePasswordButtonViewStyle: {
      marginTop: 24,
      backgroundColor: appColors.primaryColor,
      borderRadius: 4,
    },
    changePasswordButtonStyle: {
      fontSize: 14,
      fontWeight: '700',
      color: appColors.white,
      textAlign: 'center',
      padding: 12,
    },
  });
  