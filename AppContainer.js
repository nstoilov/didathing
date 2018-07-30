import React from 'react';
import { TabNavigator } from 'react-navigation';
import { observer } from 'mobx-react';
import store from './mobx/Store';
import WelcomeScreen from './screens/WelcomeScreen';
import EditScreen from './screens/EditScreen';
import ChartScreen from './screens/ChartScreen';

@observer
export default class AppContainer extends React.Component {
  render() {
    let MainNavigator = null;

    if (store.token) {
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
                chart: { screen: ChartScreen },
                edit: { screen: EditScreen }
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
