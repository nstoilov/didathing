import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import store from '../mobx/Store';

class WelcomeScreen extends Component {
  onPress = async () => {
    store.saveReturnUserToken();
    this.props.navigation.navigate('edit');
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleStyle}> Welcome </Text>
          <Text style={styles.subtitleStyle}>
            Use this app to track something
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Add thing"
            large
            color="white"
            buttonStyle={styles.buttonConfirm}
            textStyle={{ fontWeight: 'bold', fontSize: 20 }}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonConfirm: {
    backgroundColor: '#50D1CB',
    width: 200,
    height: 55,
    //borderColor: 'black',
    // borderWidth: 1,
    borderRadius: 30
  }
};

export default WelcomeScreen;
