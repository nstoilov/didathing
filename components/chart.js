import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BarChart, Grid } from 'react-native-svg-charts';
import store from '../mobx/Store';

@observer
export default class Chart extends Component {
  render() {
    const fill = 'grey';
    const first = store.getTodayEvents();
    const data = [store.goal.times, first, 40, 30, 6];
    const keys = ['1', '2', '3', '4'];

    return (
      <BarChart
        style={{ height: 200 }}
        data={data}
        keys={keys}
        svg={{ fill }}
        contentInset={{ top: 30, bottom: 30 }}
      >
        <Grid />
      </BarChart>
    );
  }
}
