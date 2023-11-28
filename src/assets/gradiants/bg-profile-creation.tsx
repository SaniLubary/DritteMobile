import { useScreenSize } from "../../hooks/useScreenSize"
import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const BgProfileCreation = (props: any) => {
  const {screenSize } = useScreenSize()
  
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={screenSize.width}
      height={screenSize.height}
      fill="none"
      {...props}
    >
      <Circle cx={290} cy={690} r={156} fill="url(#a)" />
      <Path
        fill="url(#b)"
        d={`M130.5 ${screenSize.height}C95.7 243.8 28.5 253.5 0 254V0h${screenSize.width}v61.5c-3.833-.333-27 3.5-87 21.5-75 22.5-99 82.5-142.5 126Z`}
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={290}
          x2={290}
          y1={534}
          y2={846}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF8DAD" />
          <Stop offset={1} stopColor="#F2AEC0" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={180}
          x2={180}
          y1={0}
          y2={254}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F5649E" />
          <Stop offset={1} stopColor="#D9D9D9" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
export default BgProfileCreation
