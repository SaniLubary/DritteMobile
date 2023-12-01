import * as React from "react"
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg"
const EmojiPill = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={70}
    height={70}
    fill="none"
    {...props}
  >
    <Rect width={70} height={70} fill="url(#a)" rx={17} />
    {props.children}
    <Defs>
      <LinearGradient
        id="a"
        x1={40}
        x2={42}
        y1={-32.5}
        y2={102.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={props.color ? props.color: '#F2AEC0'} />
        <Stop offset={1} stopColor="#F2AEC0" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default EmojiPill
