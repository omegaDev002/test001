/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { AppNative } from './src/AppNative';

AppRegistry.registerComponent(appName, () => AppNative);
