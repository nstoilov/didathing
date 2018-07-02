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
    store.speakEvents();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Button
          title="edit"
          large
          color="black"
          buttonStyle={styles.buttonConfirmStyle}
          onPress={() => this.onPressEdit()}
        />
        <Chart />
        <Text style={{ fontSize: 20, color: 'black' }}>{`Thing is ${
          store.goal.name
        }`}</Text>
        <Text style={{ fontSize: 20, color: 'black' }}>
          {`Goal is ${store.goal.times} per ${store.goal.per}`}
        </Text>
        <Button
          title="Did it"
          large
          color="black"
          buttonStyle={styles.buttonConfirmStyle}
          onPress={() => this.onPressDidIt()}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  buttonConfirmStyle: {
    backgroundColor: 'white',
    width: 200,
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  }
};

export default ChartScreen;
