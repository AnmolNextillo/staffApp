import * as React from "react";
import Svg, { Rect, Path, Ellipse } from "react-native-svg";
const TestIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 96 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={2.5}
      y={2.5}
      width={91}
      height={61.8729}
      rx={3.5}
      stroke="black"
      strokeWidth={5}
    />
    <Path
      d="M3.39226 14.5511H92.947M18.3181 29.1021H49.5265M18.3181 47.9875H49.5265"
      stroke="black"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <Path
      d="M67.1661 47.0587L73.2721 50.7739L82.0919 42.4148"
      stroke="black"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M67.1661 27.5541L73.2721 31.2693L82.0919 22.9102"
      stroke="black"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Ellipse cx={10.3463} cy={8.51394} rx={1.86572} ry={1.70278} fill="black" />
    <Ellipse cx={16.1131} cy={8.51394} rx={1.86572} ry={1.70278} fill="black" />
    <Ellipse cx={21.8798} cy={8.51394} rx={1.86572} ry={1.70278} fill="black" />
  </Svg>
);
export default TestIcon;
