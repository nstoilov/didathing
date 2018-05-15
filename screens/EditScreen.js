import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import WheelPicker from '../components/WheelPicker';
import TimePicker from '../components/TimePicker';
import store from '../mobx/Store';

@observer
class EditScreen extends Component {
  state = {
    name: 'name',
    times: 1,
    per: 'day'
  };

  OnPress = async () => {
    store.thing.name = this.state.name;
    await AsyncStorage.setItem('thing', JSON.stringify(store.thing));
    this.props.navigation.navigate('chart');
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>Name your thing:</Text>
        <View>
          <TextInput
            placeholder="name"
            value={this.state.value}
            onChangeText={text => this.setState({ name: text })}
            underlineColorAndroid="grey"
            style={styles.inputStyle}
          />
        </View>
        <HideWithKeyboard>
          <Text style={styles.titleStyle}>Set a goal:</Text>
          <View style={styles.buttonContainerStyle}>
            <WheelPicker />
            <Text style={styles.textStyle}>times per</Text>
            <TimePicker />
          </View>
          <View style={styles.buttonContainerStyle}>
            <Button
              title="Done"
              large
              color="black"
              buttonStyle={styles.buttonConfirmStyle}
              onPress={this.OnPress}
            />
          </View>
        </HideWithKeyboard>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  titleStyle: {
    color: 'black',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  buttonConfirmStyle: {
    backgroundColor: 'white',
    width: 200,
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black'
  }
};

export default EditScreen;
