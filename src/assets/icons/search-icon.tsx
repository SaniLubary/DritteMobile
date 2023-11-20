import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const SearchIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={23}
    fill="none"
    {...props}
  >
    <Circle cx={8.5} cy={8.5} r={8} stroke="#000" />
    <Path stroke="#000" d="m13.354 14.646 8 8" />
  </Svg>
)
export {SearchIcon}
