import { useScreenSize } from "../../hooks/useScreenSize"
import * as React from "react"
import { Text } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const TabGradiant = (props: any) => {
  const {isMediumScreen} = useScreenSize();
  const pathWidth = isMediumScreen() ? 768 : 1000;
  
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={pathWidth}
    height={56}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d={`M0 0h${pathWidth}v56H0z`} />
    <Defs>
      <LinearGradient
        id="a"
        x1={185}
        x2={188}
        y1={-188.529}
        y2={55.471}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F5649E" />
        <Stop offset={1} stopColor="#F2AEC0" />
      </LinearGradient>
    </Defs>
  </Svg>
)}
export {TabGradiant}
