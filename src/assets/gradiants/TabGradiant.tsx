import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const TabGradiant = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={360}
    height={56}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h360v56H0z" />
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
)
export {TabGradiant}
