import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
//branch is staterefactor
class WelcomeScreen extends Component {
  onPress = async () => {
    await AsyncStorage.setItem('token', 'true');
    this.props.navigation.navigate('edit');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Welcome </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Add thing"
            large
            color="black"
            buttonStyle={styles.buttonConfirm}
            onPress={() => this.onPress()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonConfirm: {
    backgroundColor: 'white',
    width: 200,
    height: 55,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20
  }
};

export default WelcomeScreen;
