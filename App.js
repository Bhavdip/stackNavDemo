import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DataManager from './utils/DataManager';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./spring.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    //must return configation object
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button onPress={params.increaseCount} title="+1" color="#fff" />
      ),
      headerLeft: (
        <Button
          onPress={() => {
            navigation.navigate('MyModal');
          }}
          title="+1"
          color="#fff"
        />
      )
    };
  };

  state = {
    count: 0
  };

  constructor() {
    super();
    this.dm = new DataManager();
  }

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    this.dm.addOneNumber();
    this.setState({
      count: this.dm.getCountValue()
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen {this.state.count}</Text>

        <Button
          title="Go to Details"
          onPress={
            /* 1. Navigate to the Details route with params */

            () =>
              this.props.navigation.navigate(
                'details' /* route name */,
                {
                  itemId: 86,
                  otherParam: 'anything you want here'
                } /* params go here */
              )
          }
        />
      </View>
    );
  }
}
class DetailsScreen extends React.Component {
  static navigationOptions = ({
    navigation,
    navigationOptions,
    screenProps
  }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      /* These values are used instead of the shared configuration! Means override*/
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'No-Id');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>OtherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('details')}
        />
        <Button
          title="Go to home"
          onPress={() => this.props.navigation.navigate('home')}
        />
        <Button
          title="Go to Back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Updated!' })
          }
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    home: HomeScreen,
    details: DetailsScreen
  },
  {
    initialRouteName: 'home',
    /** header configration for whole app */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);
export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
