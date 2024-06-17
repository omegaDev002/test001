import {createStackNavigator} from '@react-navigation/stack';
import {ListScreen} from '../../pokemon/ui/screens/list/ListScreen';
import {DetailScreen} from '../../pokemon/ui/screens/detail/DetailScreen';
import {SearchScreen} from '../../pokemon/ui/screens/search/SearchScreen';

export type RootStackParams = {
  ListScreen: undefined;
  SearchScreen: undefined;
  DetailScreen: {pokemonId: number};
};

const Stack = createStackNavigator<RootStackParams>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{title: 'Details', headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export const SearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{title: 'Details', headerShown: true}}
      />
    </Stack.Navigator>
  );
};
