import {AppRegistry} from 'react-native'
import Navigator from './src/routes'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => Navigator)
