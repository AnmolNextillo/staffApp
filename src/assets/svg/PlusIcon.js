import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const PlusIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M28 18H18v10c0 1.1-.896 2-2 2s-2-.9-2-2V18H4c-1.104 0-2-.9-2-2s.896-2 2-2h10V4c0-1.1.896-2 2-2s2 .9 2 2v10h10c1.104 0 2 .9 2 2s-.896 2-2 2Zm0-6h-8V4a4 4 0 1 0-8 0v8H4a4 4 0 1 0 0 8h8v8a4 4 0 1 0 8 0v-8h8a4 4 0 1 0 0-8Z"
    />
  </Svg>
)
export default PlusIcon
