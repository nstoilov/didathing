import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis
} from 'victory-native';
import store from '../mobx/Store';

console.log('store.events, store.goal: ', store.events, store.goal);

@observer
export default class Chart extends React.Component {
  render() {
    const data = [
      { day: 1, times: 1 || 0 },
      { day: 2, times: 4 },
      { day: 3, times: 3 },
      { day: 4, times: 2 }
    ];

    return (
      <View style={styles.container}>
        <VictoryChart
          width={350}
          theme={VictoryTheme.grayscale}
          domainPadding={10}
          domain={[0, 5]}
        >
          <VictoryAxis
            //    tickValues={[1, 2, 3, 4]}
            tickFormat={['day 1', 'day 2', 'day 3', 'day 4']}
          />
          <VictoryAxis dependentAxis tickFormat={x => `x${x}`} />
          <VictoryBar
            data={data}
            x="day"
            y="times"
            labels={d => d.y}
            style={{ labels: { fill: 'white' } }}
            labelComponent={<VictoryLabel dy={30} />}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
