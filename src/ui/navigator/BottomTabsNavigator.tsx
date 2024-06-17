import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '../components/shared/MaterialIcons';
import {MainNavigator, SearchNavigator} from './StackNavigator';

export type RootTabParams = {
  Main: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<RootTabParams>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          borderColor: 'transparent',
        },
        tabBarStyle: {
          borderWidth: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Main"
        options={{
          title:'Main',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={30} />
          ),
        }}
        component={MainNavigator}
      />
      <Tab.Screen
        name="Search"
        options={{
          title:'Search',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="search" color={color} size={30} />
          ),
        }}
        component={SearchNavigator}
      />
    </Tab.Navigator>
  );
};
