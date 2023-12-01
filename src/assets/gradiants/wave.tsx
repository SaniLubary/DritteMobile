import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const Wave = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={141}
    height={92}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M61 61c49.5-7.5 25.5 30.5 80 30.5V0H0c17.833 8.833 16.014 67.816 61 61Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={39}
        x2={299}
        y1={82.5}
        y2={-136}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F2AEC0" />
        <Stop offset={1} stopColor="#D32455" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default Wave
