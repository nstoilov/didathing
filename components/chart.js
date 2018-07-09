import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryLine
} from 'victory-native';
import store from '../mobx/Store';

@observer
class Chart extends Component {
  testData = [
    { day: 1, times: 3 },
    { day: 2, times: 4 },
    { day: 3, times: 3 },
    { day: 4, times: store.goal.times }
  ];
  render() {
    return (
      <View style={styles.container}>
        <Text>{store.goal.times}</Text>
        <VictoryChart
          width={350}
          theme={VictoryTheme.grayscale}
          domainPadding={10}
          domain={[0, 5]}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={store.chartLegends.slice()}
          />
          <VictoryAxis dependentAxis tickFormat={x => `x${x}`} />
          <VictoryBar
            data={this.testData}
            x="day"
            y="times"
            labels={d => d.y}
            style={{ labels: { fill: 'white' } }}
            labelComponent={<VictoryLabel dy={30} />}
          />
          <VictoryLine
            style={{ data: { stroke: 'blue', strokeWidth: 5 } }}
            y={() => store.goal.times}
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

export default Chart;
