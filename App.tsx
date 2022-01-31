import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { LandingScreen } from './src/screens/LandingScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator(
      {
        Landing: LandingScreen,
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }
    ),
  },
  homeStack: createBottomTabNavigator({
    // Home tab icon
    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({
          focused,
          tintColor,
        }: {
          focused: boolean;
          tintColor: string;
        }) => {
          let icon = focused
            ? require('./src/images/home_icon.png')
            : require('./src/images/home_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },

    // Offer tab icon
    Offer: {
      screen: createStackNavigator({
        OfferPage: HomeScreen, // TODO
      }),
      navigationOptions: {
        tabBarIcon: ({
          focused,
          tintColor,
        }: {
          focused: boolean;
          tintColor: string;
        }) => {
          let icon = focused
            ? require('./src/images/offer_icon.png')
            : require('./src/images/offer_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },

    // Cart tab icon
    Cart: {
      screen: createStackNavigator({
        CartPage: HomeScreen, // TODO
      }),
      navigationOptions: {
        tabBarIcon: ({
          focused,
          tintColor,
        }: {
          focused: boolean;
          tintColor: string;
        }) => {
          let icon = focused
            ? require('./src/images/cart_icon.png')
            : require('./src/images/cart_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },

    // Account tab icon
    Account: {
      screen: createStackNavigator({
        AccountPage: HomeScreen, // TODO
      }),
      navigationOptions: {
        tabBarIcon: ({
          focused,
          tintColor,
        }: {
          focused: boolean;
          tintColor: string;
        }) => {
          let icon = focused
            ? require('./src/images/account_icon.png')
            : require('./src/images/account_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
  }),
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return <AppNavigation />;
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  },
});
