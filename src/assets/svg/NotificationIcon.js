import * as React from "react"
import Svg, { Path } from "react-native-svg"
const NotificationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 19.25a3 3 0 0 1-6 0M5.581 18.25a2 2 0 0 1-1.57-2.2l1-8.11a7 7 0 0 1 7-5.94v0a7 7 0 0 1 7 5.94l1 8.11a2 2 0 0 1-1.56 2.2 28.132 28.132 0 0 1-12.87 0v0Z"
    />
  </Svg>
)
export default NotificationIcon
