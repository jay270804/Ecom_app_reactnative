import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SearchIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#323234"
        d="m16 15.058-4.175-4.175a6.677 6.677 0 1 0-.942.943L15.056 16l.943-.942ZM6.667 12a5.333 5.333 0 1 1 0-10.666 5.333 5.333 0 0 1 0 10.666Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SearchIcon;
