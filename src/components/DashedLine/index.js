import React from 'react';
import Svg, { Line } from 'react-native-svg';

const DashedLine = () => {
    return (
        <Svg height="2" width="100%">
            <Line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#E6E6E6"
                strokeWidth="2"
                strokeDasharray="5,5"
            />
        </Svg>
    );
};

export default DashedLine;
