import 'react-native-gesture-handler';

import {BottomTabNavigator} from './ui/navigator/BottomTabsNavigator';
import {ThemeContextProvider} from './ui/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export const AppNative = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <BottomTabNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
