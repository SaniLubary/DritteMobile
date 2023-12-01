import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const CheckMark = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <Circle cx={17.5} cy={17.5} r={16.5} stroke={props.color} strokeWidth={2} />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={4}
      d="m8 19 6 5M14 24l13-13"
    />
  </Svg>
)
export default CheckMark
