import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const NewEntryIcon = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={52}
    fill="none"
    {...props}
  >
    <Rect width={46} height={47.022} y={0.971} fill="#D32455" rx={23} />
    <Path
      stroke="#F2A3BB"
      strokeLinecap="round"
      strokeWidth={2}
      d="M23.511 11.193v26.578M10.222 24.482H36.8"
    />
  </Svg>
)
export {NewEntryIcon}
