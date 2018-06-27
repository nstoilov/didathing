import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryLine
} from 'victory-native';
import store from '../mobx/Store';

export default class Chart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
            data={store.testData.slice()}
            x="day"
            y="times"
            labels={d => d.y}
            style={{ labels: { fill: 'white' } }}
            labelComponent={<VictoryLabel dy={30} />}
          />
          <VictoryLine
            style={{ data: { stroke: 'blue', strokeWidth: 5 } }}
            y={d => d.x}
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
