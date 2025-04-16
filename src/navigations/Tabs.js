import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Test from '../screens/Tests/Test';
import Attendence from '../screens/Attendence/Attendence';
import HomeIcon from '../assets/svg/HomeIcon';
import MassageIcon from '../assets/svg/MassageIcon';
import NotificationIcon from '../assets/svg/NotificationIcon';
import ProfileIcon from '../assets/svg/ProfileIcon';
import { appColors } from '../utils/color';
import Profile from '../screens/Profile/Profile';
import TestIcon from '../assets/svg/TestIcon';

const Tab = createBottomTabNavigator();

const Tabs = () => {   
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: appColors.white,
          height: 80,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
              }}>
              <HomeIcon stroke={focused ? appColors.primaryColor : appColors.black} />
              <Text
                style={{
                  color: focused ? appColors.primaryColor : appColors.black,
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Massage"
        component={Test}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
              }}>
              {/* <Image
                source={getImage('booking')}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 24,
                  width: 24,
                }}
                resizeMode="contain"
              /> */}
              <TestIcon
                stroke={focused ? appColors.primaryColor : appColors.black}
              />
              <Text
                style={{
                  color: focused ? appColors.primaryColor : appColors.black,
                  fontSize: 12,
                }}>
                Test
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Attendence}
        options={{
          tabBarIcon: ({focused}) => (
            // <JobsIcon stroke={focused ? appColors.black : appColors.grey} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
              }}>
              <NotificationIcon
                stroke={focused ? appColors.black : appColors.grey}
              />
              <Text
                style={{
                  color: focused ? appColors.primaryColor : appColors.black,
                  fontSize: 12,
                }}>
                Attendence
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
              }}>
              {/* <Image
                source={getImage('user')}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 24,
                  width: 24,
                }}
                resizeMode="contain"
              /> */}
              <ProfileIcon
                stroke={focused ? appColors.black : appColors.grey}
              />
              <Text
                style={{
                  color: focused ? appColors.primaryColor : appColors.black,
                  fontSize: 12,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
