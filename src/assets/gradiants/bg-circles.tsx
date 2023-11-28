import { useScreenSize } from "../../hooks/useScreenSize"
import * as React from "react"
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg"
const BgCircles = ({children, style}: {children?: React.ReactNode, style?: any}) => {
  const {screenSize} = useScreenSize()
  
  return (
    <Svg
      width={screenSize.width}
      height={screenSize.height}
      fill="none"
      style={style}
    >
      {children}
      <Ellipse cx={180} cy={212} fill="url(#a)" rx={screenSize.width} ry={screenSize.height} />
      <Ellipse cx={180} cy={294} fill="url(#b)" rx={screenSize.width} ry={screenSize.height} />
      <Ellipse cx={180} cy={481} fill="url(#c)" rx={screenSize.width} ry={screenSize.height} />
      <Defs>
        <LinearGradient
          id="a"
          x1={180}
          x2={180}
          y1={-62}
          y2={486}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F5649E" />
          <Stop offset={1} stopColor="#D32455" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={180}
          x2={180}
          y1={7}
          y2={581}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F5649E" />
          <Stop offset={1} stopColor="#D32455" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="c"
          x1={180}
          x2={180}
          y1={194}
          y2={768}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F5649E" />
          <Stop offset={1} stopColor="#D32455" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
export default BgCircles
