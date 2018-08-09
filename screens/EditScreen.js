import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import WheelPicker from '../components/WheelPicker';
import TimePicker from '../components/TimePicker';
import store from '../mobx/Store';

@observer
class EditScreen extends Component {
  onPress = async () => {
    this.props.navigation.navigate('chart');
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>Name your thing:</Text>
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder={store.goal.name}
            onChangeText={text => store.setGoal('name', text)}
            underlineColorAndroid="#50D1CB"
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
              color="white"
              buttonStyle={styles.buttonStyle}
              textStyle={{ fontWeight: 'bold', fontSize: 20 }}
              onPress={this.onPress}
            />
          </View>
        </HideWithKeyboard>
      </View>
    );
  }
}

const styles = {
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
  inputStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5
  },

  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  buttonStyle: {
    backgroundColor: '#50D1CB',
    width: 300,
    height: 55,
    borderRadius: 30
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    marginLeft: 10
  }
};

export default EditScreen;
