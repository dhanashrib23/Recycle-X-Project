import { registerRootComponent } from 'expo';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';


import Launcher from './screens/Launcher';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Launcher);

AppRegistry.registerComponent(Launcher, () => gestureHandlerRootHOC(Launcher));
