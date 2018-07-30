import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { Line, G, Text } from 'react-native-svg';
import store from '../mobx/Store';

@observer
export default class Chart extends Component {
  render() {
    const data = store.getChartEvents();
    const chartLegends = store.getChartLegends();
    //  const lineY = store.goal.times;
    const lineY = store.getGoal();
    const screenWidth = Dimensions.get('window').width;

    const HorizontalLine = ({ y }) => (
      <G>
        <Line
          key={'goal'}
          x1={'7%'}
          x2={'100%'}
          y1={y(lineY)}
          y2={y(lineY)}
          stroke={'grey'}
          strokeDasharray={[4, 8]}
          strokeWidth={2}
        />
        <Text x={'0%'} y={y(lineY)} fontSize="17">
          {lineY}
        </Text>
      </G>
    );

    const CUT_OFF = 20;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={20}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value}
        </Text>
      ));

    const axesSvg = { fontSize: 18, fill: 'black' };
    //const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    return (
      <View
        style={{
          width: screenWidth,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: 'row',
          flex: 1
        }}
      >
        <View style={{ flex: 1, marginLeft: 0, marginRight: 10 }}>
          <BarChart
            style={{ marginHorizontal: 10, flex: 1 }}
            data={data}
            gridMax={2}
            contentInset={{ top: 20, bottom: 20, left: 30, right: 10 }}
            // spacing={0.4}
            spacingInner={0.6}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
          >
            <Labels />
            <HorizontalLine />
          </BarChart>
          <XAxis
            style={{
              marginHorizontal: 10,
              height: xAxisHeight
            }}
            data={data}
            formatLabel={(value, index) => chartLegends[index]}
            contentInset={{ left: 50, right: 50 }}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}
