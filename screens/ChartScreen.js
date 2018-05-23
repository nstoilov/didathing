import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import Storage from 'react-native-storage';
import { Button } from 'react-native-elements';
import store from '../mobx/Store';
import Chart from '../components/chart';

let index = 0;
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
});
global.storage = storage;

@observer
class ChartScreen extends Component {
  async componentWillMount() {
    await storage.clearMap();
    const goal = await AsyncStorage.getItem('goal');
    store.goal = JSON.parse(goal);
  }

  onPressEdit = () => {
    this.props.navigation.navigate('edit');
  };

  async onPressDidIt() {
    const date = new Date().toISOString();
    await storage.save({
      key: 'event',
      id: index,
      data: {
        date
      },
      expires: 1000 * 3600
    });
    index++;

    const result = await storage.getAllDataForKey('event');
    store.events = result;
    console.log(store.events.length);
  }

  //dataset is store.events & store.goal :)
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
        <Text
          style={{
            marginTop: 30,
            fontSize: 25,
            color: 'black',
            textAlign: 'center'
          }}
        >
          {store.goal.name}
        </Text>
        <Chart />

        <Text style={{ fontSize: 20, color: 'black', marginBottom: 20 }}>
          {`Goal is ${store.goal.times} times per ${store.goal.per}`}
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
    borderRadius: 20
  }
};

export default ChartScreen;
