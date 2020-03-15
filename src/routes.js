import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Auth from './pages/Auth'
import TaskPage from './pages/TaskPage'

const mainRoutes = {
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Task',
    screen: TaskPage,
  },
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Auth',
})

export default createAppContainer(mainNavigator)
