import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Line } from 'react-native-svg';
import store from '../mobx/Store';

@observer
export default class Chart extends Component {
  render() {
    // const fill = 'grey';
    const todayEvents = store.getTodayEvents();
    const ydayEvents = store.getYesterdayEvents();
    const data = [3, 5, ydayEvents, todayEvents];
    const chartLegends = store.chartLegends;
    const lineY = store.getGoal();
    //const yData = [lineY];
    //  const keys = ['1', '2', '3', '4'];
    const HorizontalLine = ({ y }) => (
      <Line
        key={'goal'}
        x1={'0%'}
        x2={'100%'}
        y1={y(lineY)}
        y2={y(lineY)}
        stroke={'grey'}
        strokeDasharray={[4, 8]}
        strokeWidth={2}
      />
    );

    const axesSvg = { fontSize: 15, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    return (
      <View
        style={{
          width: 400,
          height: 200,
          padding: 20,
          flexDirection: 'row',
          flex: 1
        }}
      >
        <YAxis
          data={data}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
          numberOfTicks={5}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ marginLeft: 8, flex: 1 }}
            data={data}
            gridMax={2}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
          >
            <Grid />
            <HorizontalLine />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
            formatLabel={(value, index) => chartLegends[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}
