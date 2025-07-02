import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg"
const ShoppingCart = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G fill="#CB5814" clipPath="url(#a)">
      <Path d="M16 2H2.828L2.8 1.766A2 2 0 0 0 .815 0H0v1.333h.815a.667.667 0 0 1 .662.589l1.056 8.979a2 2 0 0 0 1.986 1.766h8.814v-1.334H4.52a.666.666 0 0 1-.662-.589L3.769 10h10.788L16 2Zm-2.557 6.667h-9.83l-.628-5.334h11.42l-.962 5.334ZM4.667 16a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM11.333 16a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ShoppingCart
