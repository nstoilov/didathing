import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import moment from 'moment';
import store from '../mobx/Store';
import storage from '../components/storage';
import Chart from '../components/chart';

let index = 0;

@observer
class ChartScreen extends Component {
  async componentWillMount() {
    await storage.clearMap();
    const thing = await AsyncStorage.getItem('thing');
    store.thing = JSON.parse(thing);
  }

  onPressEdit = () => {
    this.props.navigation.navigate('edit');
  };

  async onPressDidIt() {
    const date = moment().format('YYYYMMDD');
    await storage.save({
      key: 'event',
      id: index,
      data: {
        date
      },
      expires: 1000 * 3600
    });
    index++;

    store.events = await storage.getAllDataForKey('event');

    store.speakEvents();
    // store.testMoment();
  }

  //dataset is store.events & store.thing :)
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
          store.thing.name
        }`}</Text>
        <Text style={{ fontSize: 20, color: 'black' }}>
          {`Goal is ${store.thing.times} per ${store.thing.per}`}
        </Text>
        <Text style={{ fontSize: 20, color: 'black' }}>{`dataset ${
          this.result
        }`}</Text>
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
    borderRadius: 20
  }
};

export default ChartScreen;
