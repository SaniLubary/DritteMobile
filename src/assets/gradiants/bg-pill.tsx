import { TextCustom } from "../../components/atoms/text"
import * as React from "react"
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg"
const Pill = (props: any) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.text.length * 14}
            height={36}
            fill="none"
            {...props}
        >
            <Rect width={props.text.length * 14} height={36} fill="url(#a)" rx={19} />
            <TextCustom style={{ top: 8, alignSelf: 'center' }} variant="normal">{props.text}</TextCustom>
            <Defs>
                <LinearGradient
                    id="a"
                    x1={89}
                    x2={22.86}
                    y1={28.75}
                    y2={-46.344}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor={props.color} />
                    <Stop offset={1} stopColor="#fff" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}
export default Pill
