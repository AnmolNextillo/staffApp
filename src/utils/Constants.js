import { showMessage } from "react-native-flash-message";

//Api BaseUrl
export const ApiBaseUrl = 'https://api.kcmschool.co.in/v1/';

//Api Names
export const loginApi = 'staff/login';
export const logout = 'staff/logout';
export const profile = 'staff/profile';                   
export const classTestsList = 'staff/classTestsList';                   
export const myClassMates = 'student/myClassMates';
export const changePassword = 'staff/changePassword';
export const mySubjects = 'student/mySubjects';
export const timeTable = 'student/timeTable';
export const homeWork = 'staff/homeWork';
export const leaves = 'student/leaves';
export const announcements = 'staff/announceMents';
export const events = 'staff/events';
export const annualCalender = 'student/annualCalender';
export const appointments = 'staff/appointments';
export const testDetails = 'staff/classTestDetails';
export const ackTest = 'student/ackTest';
export const myAttendanceApi = 'student/myAttendance';
export const getAppVersionsApi = 'student/getAppVersions';
export const subjectLists = 'staff/subjectList';
export const classList = 'staff/classList';
export const classTest = 'staff/classTest';
export const addAnnouncementApi = 'staff/announcement';
export const announcementListApi = 'staff/announcementList';
export const announcementDetailsApi = 'staff/announcementDetails';
export const upload = 'staff/upload';
export const getHomeWorkList = 'staff/getHomeWorkList';
export const galleryMedia = 'staff/galleryMedia';
export const attendance = 'staff/attendance';
export const attendanceDetails = 'staff/attendanceDetails';
export const updateAttendanceDetails = 'staff/updateAttendanceDetails';
export const markFinalAttendance = 'staff/markFinalAttendance';

export const handleShowMessage = (message,type) => {
    showMessage({
      message: "KCM School",
      description: message,
      type: type, // 'success', 'info', 'warning', 'danger'
      position:'top'
    });
  };

  export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };