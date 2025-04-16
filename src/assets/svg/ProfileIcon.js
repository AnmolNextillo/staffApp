import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const ProfileIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      stroke="#130F26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipRule="evenodd"
    >
      <Path d="M11.845 21.662C8.152 21.662 5 21.087 5 18.787c0-2.301 3.133-4.425 6.845-4.425 3.691 0 6.844 2.103 6.844 4.404 0 2.3-3.133 2.896-6.845 2.896ZM11.837 11.174a4.386 4.386 0 1 0 0-8.774A4.388 4.388 0 0 0 7.45 6.787a4.37 4.37 0 0 0 4.356 4.387h.031Z" />
    </G>
  </Svg>
)
export default ProfileIcon
