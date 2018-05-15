import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'react-native-elements';

@observer
class ChartScreen extends Component {
  state = {
    name: 'name',
    times: 1,
    per: 'day'
  };

  async componentWillMount() {
    const name = await AsyncStorage.getItem('thing.name');
    if (name) {
      this.setState({ name });
    }
    const times = await AsyncStorage.getItem('thing.times');
    if (per) {
      this.setState({ times });
    }
    const per = await AsyncStorage.getItem('thing.per');
    if (per) {
      this.setState({ per });
    }
  }

  onPressEdit = () => {
    this.props.navigation.navigate('edit');
  };

  render() {
    // const date = new Date().toString();

    return (
      <View style={styles.containerStyle}>
        <Button
          title="edit"
          large
          color="black"
          buttonStyle={styles.buttonConfirmStyle}
          onPress={() => this.onPressEdit()}
        />
        <Text style={{ fontSize: 20, color: 'black' }}>{`Thing is ${
          this.state.name
        }`}</Text>
        <Text style={{ fontSize: 20, color: 'black' }}>
          {`Thing is done ${this.state.times}`}
        </Text>
        <Text style={{ fontSize: 20, color: 'black' }}>{`per ${
          this.state.per
        }`}</Text>
        <Text
          style={{ fontSize: 20, color: 'black' }}
        >{`events.log goes here ${1}`}</Text>
        <Button
          title="Did it"
          large
          color="black"
          buttonStyle={styles.buttonConfirmStyle}
          onPress={() => {}}
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
