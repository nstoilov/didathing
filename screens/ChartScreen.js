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
    selectedIndex: store.getIndex()
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

  onPressUndo() {
    store.undoEvent();
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
        <View style={styles.buttonsContainerTopStyle}>
          <Button
            title="Edit"
            color="black"
            buttonStyle={styles.buttonTopStyle}
            onPress={() => this.onPressEdit()}
          />
          <Button
            title="Clear All Data"
            color="black"
            buttonStyle={styles.buttonTopStyle}
            onPress={() => this.onPressReset()}
          />
          <Button
            title="Undo"
            color="black"
            buttonStyle={styles.buttonTopStyle}
            onPress={() => this.onPressUndo()}
          />
        </View>
        <Text style={styles.titleStyle}>{store.goal.name}</Text>
        <Text style={styles.subtitleStyle}>
          {`Goal: ${store.goal.times} per ${store.goal.per}`}
        </Text>
        <Chart />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerBorderRadius={20}
        />
        <View style={styles.buttonsContainerBottomStyle}>
          <Button
            title="Did it"
            large
            color="black"
            buttonStyle={styles.buttonBottomStyle}
            onPress={() => this.onPressDidIt()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitleStyle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 40
  },
  buttonsContainerTopStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  buttonsContainerBottomStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10
  },
  buttonTopStyle: {
    backgroundColor: 'white',
    //  width: 200,
    // height: 55,
    borderColor: 'grey',
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10
  },
  buttonBottomStyle: {
    backgroundColor: 'white',
    width: 300,
    height: 55,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  }
};

export default ChartScreen;
