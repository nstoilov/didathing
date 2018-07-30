import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { Button, ButtonGroup } from 'react-native-elements';
import moment from 'moment';
import store from '../mobx/Store';
import Chart from '../components/chart';

@observer
class ChartScreen extends Component {
  state = {
    selectedIndex: 2
  };

  onPressEdit = () => {
    this.props.navigation.navigate('edit');
  };

  onPressDidIt() {
    const event = {
      date: moment().format('YYYYMMDD'),
      week: moment().week(),
      month: moment().format('MMM')
    };
    store.addEvent(event);
  }

  onPressReset() {
    store.resetEvents();
  }

  updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
    switch (selectedIndex) {
      case 0:
        return store.changeMode('days');
      case 1:
        return store.changeMode('weeks');
      case 2:
        return store.changeMode('months');
      default:
        return store.changeMode('days');
    }
  };

  render() {
    const component1 = () => <Text>Days</Text>;
    const component2 = () => <Text>Weeks</Text>;
    const component3 = () => <Text>Months</Text>;
    const buttons = [
      { element: component1 },
      { element: component2 },
      { element: component3 }
    ];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.buttons}>
          <Button
            title="edit"
            large
            color="black"
            buttonStyle={styles.buttonConfirmStyle}
            onPress={() => this.onPressEdit()}
          />
          <Button
            title="reset"
            large
            color="black"
            buttonStyle={styles.buttonConfirmStyle}
            onPress={() => this.onPressReset()}
          />

          <Button
            title="Did it"
            large
            color="black"
            buttonStyle={styles.buttonConfirmStyle}
            onPress={() => this.onPressDidIt()}
          />
        </View>

        <Text style={{ fontSize: 40, color: 'black', textAlign: 'center' }}>
          {store.goal.name}
        </Text>
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>
          {`Goal: ${store.goal.times} per ${store.goal.per}`}
        </Text>
        <Chart />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerBorderRadius={20}
        />
      </View>
    );
  }
}

const styles = {
  buttons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 40
  },
  buttonConfirmStyle: {
    backgroundColor: 'white',
    width: 100,
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  }
};

export default ChartScreen;
