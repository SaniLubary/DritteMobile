import * as React from "react"
import { TouchableOpacity } from "react-native"
import Svg, { Path } from "react-native-svg"
const Arrow = ({color, disabled, onPress, style}: any) => (
    <TouchableOpacity style={style} disabled={disabled} onPress={onPress}>
        <Svg
            width={38}
            height={38}
            fill="none"
        >
            <Path
                fill={color}
                d="M36.768 20.768a2.5 2.5 0 0 0 0-3.536l-15.91-15.91a2.5 2.5 0 0 0-3.536 3.536L31.465 19 17.322 33.142a2.5 2.5 0 0 0 3.536 3.536l15.91-15.91ZM0 21.5h35v-5H0v5Z"
            />
        </Svg>
    </TouchableOpacity>
)
export default Arrow
