import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Subscribe } from 'unstated';
import { Button } from 'react-native-elements';
import { StateContainer } from '../StateContainer';

export default class WelcomeScreen extends React.Component {

    onPress = async () => {
        await AsyncStorage.setItem('token', 'true'); 
        this.props.navigation.navigate('edit');  
    }

    render() {
        return (
            <Subscribe to={[StateContainer]}>
                {() => (
                    <View style={styles.containerStyle}>
                        <Text style={styles.textStyle}>
                            Welcome Screen
                      </Text>
                        <View
                            style={styles.buttonContainerStyle}
                        >
                            < Button
                                title='Navigate'
                                color='black'
                                buttonStyle={styles.buttonStyle}
                                onPress={() => this.onPress()}
                            />    
                        </View>
                    </View>
                )}
            </Subscribe>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 40
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: 'white',
        width: 200,
        height: 55,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20
    }
};
