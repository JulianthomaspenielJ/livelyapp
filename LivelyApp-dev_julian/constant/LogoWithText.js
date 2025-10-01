import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';

function LogoWithText(props) {
  return (
    <Svg
      width={397}
      height={521}
      viewBox="0 0 235 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Path fill="url(#pattern0_34_161)" d="M0 0H235V75H0z" />
      <Defs>
        <Pattern
          id="pattern0_34_161"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use
            xlinkHref="#image0_34_161"
            transform="matrix(.00029 0 0 .0009 -.093 -1.528)"
          />
        </Pattern>
      </Defs>
    </Svg>
  );
}
export default LogoWithText;
