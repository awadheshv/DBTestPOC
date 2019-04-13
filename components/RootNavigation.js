import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator, createAppContainer,createStackNavigator} from 'react-navigation';
import TradingListComponent from './TradingListComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: "Detail",
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

const SettingsScreen = (props) =>
    <View style={{flex:1,paddingTop:60,justifyContent: 'center',alignItems: 'center'}}>
        <Text>Setting Screen</Text>
    </View>;

const HomeStack = createStackNavigator({
    Home: TradingListComponent,
    Details: DetailsScreen,
});

const tabNavigator =  createBottomTabNavigator(
    {
        Home: HomeStack,
        Settings: SettingsScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                 if (routeName === 'Settings') {
                    iconName = `ios-options`;
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(tabNavigator);