import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BarChart, Grid } from 'react-native-svg-charts';
import store from '../mobx/Store';

@observer
export default class Chart extends Component {
  render() {
    const fill = 'rgb(134, 65, 244)';
    const first = store.getTodayEvents();
    const data = [store.goal.times, first, 40, 30, 6];

    return (
      <BarChart
        style={{ height: 200 }}
        data={data}
        svg={{ fill }}
        contentInset={{ top: 30, bottom: 30 }}
      >
        <Grid />
      </BarChart>
    );
  }
}
