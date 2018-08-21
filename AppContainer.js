import React from 'react';
import { TabNavigator } from 'react-navigation';
import { observer } from 'mobx-react';
import { AsyncStorage } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import EditScreen from './screens/EditScreen';
import ChartScreen from './screens/ChartScreen';

@observer
export default class AppContainer extends React.Component {
  state = { token: null };

  async componentWillMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.setState({ token: true });
    } else {
      this.setState({ token: false });
    }
  }

  render() {
    let MainNavigator = null;
    if (this.state.token) {
      MainNavigator = TabNavigator(
        {
          main: {
            screen: TabNavigator(
              {
                chart: { screen: ChartScreen },
                edit: { screen: EditScreen }
              },
              {
                swipeEnabled: false,
                lazy: true,
                animationEnabled: false,
                navigationOptions: {
                  tabBarVisible: false
                }
              }
            )
          }
        },
        {
          swipeEnabled: false,
          lazy: true,
          animationEnabled: false,
          navigationOptions: {
            tabBarVisible: false
          }
        }
      );
    } else {
      MainNavigator = TabNavigator(
        {
          main: {
            screen: TabNavigator(
              {
                welcome: { screen: WelcomeScreen },
                edit: { screen: EditScreen },
                chart: { screen: ChartScreen }
              },
              {
                swipeEnabled: false,
                animationEnabled: false,
                navigationOptions: {
                  tabBarVisible: false
                }
              }
            )
          }
        },
        {
          swipeEnabled: false,
          animationEnabled: false,
          navigationOptions: {
            tabBarVisible: false
          }
        }
      );
    }

    return <MainNavigator />;
  }
}
