import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Login from './src/screens/Login';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import BottomBar from './src/navigations/BottomBar';
import AddTest from './src/screens/AddTest';
import StudentList from './src/screens/StudentList';
import HomeWorkList from './src/screens/HomeworkList';
import AddHomework from './src/screens/AddHomework';
import Annoucement from './src/screens/Annoucement/Annoucement';
import AddAnnoucement from './src/screens/AddAnnoucement/AddAnnoucement';
import TestDetail from './src/screens/TestDetail.js';
import FlashMessage from 'react-native-flash-message';
import AnnoucementDetail from './src/screens/AnnoucementDetail/AnnoucementDetail.js';
import ClassList from './src/screens/ClassList/index.js';
import EventDetail from './src/screens/EventDetail/EventDetail.js';
import AddEvent from './src/screens/AddEvents/AddEvent.js';
import EventList from './src/screens/EventList/Event.js';
import Gallery from './src/screens/Gallery/Gallery.js';
import ImageUploadScreen from './src/screens/ImageUploadScreen/index.js';
import Homework from './src/screens/Homework/index.js';
import GallerySubjectList from './src/screens/GallerySubjectList/index.js';
import ImageViewScreen from './src/screens/ImageViewScreen.js/index.js';
import ChangePassword from './src/screens/ChangePassword/Index.js';
import Session from './src/screens/Session/Index.js';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name="BottomBar" component={BottomBar} options={{title: 'BottomBar'}}/>
        <Stack.Screen name="AddTest" component={AddTest} options={{title: 'AddTest'}}/>
        <Stack.Screen name="StudentList" component={StudentList} options={{title: 'StudentList'}}/>
        <Stack.Screen name="HomeWorkList" component={HomeWorkList} options={{title: 'HomeWorkList'}}/>
        <Stack.Screen name="Homework" component={Homework} options={{title: 'Homework'}}/>
        <Stack.Screen name="AddHomework" component={AddHomework} options={{title: 'AddHomework'}}/>
        <Stack.Screen name="Annoucement" component={Annoucement} options={{ title: 'Annoucement' }} />
        <Stack.Screen name="AddAnnoucement" component={AddAnnoucement} options={{ title: 'AddAnnoucement' }} />
        <Stack.Screen name="TestDetail" component={TestDetail} options={{ title: 'TestDetail' }} />
        <Stack.Screen name="AnnoucementDetail" component={AnnoucementDetail} options={{ title: 'AnnoucementDetail' }} />
        <Stack.Screen name="ClassList" component={ClassList} options={{ title: 'ClassList' }} />
        <Stack.Screen name="EventList" component={EventList} options={{ title: 'EventList' }} />
        <Stack.Screen name="EventDetail" component={EventDetail} options={{ title: 'EventDetail' }} />
        <Stack.Screen name="AddEvent" component={AddEvent} options={{ title: 'AddEvent' }} />
        <Stack.Screen name="Gallery" component={Gallery} options={{ title: 'Gallery' }} />
        <Stack.Screen name="GallerySubjectList" component={GallerySubjectList} options={{ title: 'GallerySubjectList' }} />
        <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} options={{ title: 'ImageUploadScreen' }} />
        <Stack.Screen name="ImageViewScreen" component={ImageViewScreen} options={{ title: 'ImageViewScreen' }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'ChangePassword' }} />
        <Stack.Screen name="Session" component={Session} options={{ title: 'Session' }} />
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="bottom" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
