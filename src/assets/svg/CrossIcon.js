import * as React from "react";
import Svg, { G, Polygon } from "react-native-svg";
const CrossIcon = (props) => (
  <Svg
    fill="#000000"
    height="800px"
    width="800px"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <G>
      <G>
        <Polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512  512,452.922 315.076,256  " />
      </G>
    </G>
  </Svg>
);
export default CrossIcon;
