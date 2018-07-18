import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import moment from 'moment';
import store from '../mobx/Store';
import Chart from '../components/chart';

@observer
class ChartScreen extends Component {
  onPressEdit = () => {
    this.props.navigation.navigate('edit');
  };

  onPressDidIt() {
    const date = moment().format('YYYYMMDD');
    store.addEvent(date);
    store.getYesterdayEvents();
    console.log(store.events.slice().length);
  }

  onPressReset() {
    store.resetEvents();
  }

  render() {
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

        <Chart />
        <Text style={{ fontSize: 20, color: 'black' }}>{`Thing is ${
          store.goal.name
        }`}</Text>
        <Text style={{ fontSize: 20, color: 'black' }}>
          {`Goal is ${store.goal.times} per ${store.goal.per}`}
        </Text>
        <Text style={{ fontSize: 20, color: 'black' }}>
          {`Done ${store.getTodayEvents()} times`}
        </Text>
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
