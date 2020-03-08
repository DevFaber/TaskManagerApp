import React, {Component} from 'react'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'

import globalStyles from '../GlobalStyles'
import imgHoje from '../../assets/imgs/today.jpg'

import Tasks from '../components/Tasks'
import AddTask from './AddTask'

const initialState = {
  showDone: true,
  handleAddTask: false,
  visibleTasks: [],
  tasks: [],
}

export default class TaskPage extends Component {
  state = {
    ...initialState,
  }

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('taskState')
    const state = JSON.parse(stateString) || initialState
    this.setState(state, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDone) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pendingTasks = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pendingTasks)
    }

    this.setState({visibleTasks})
    AsyncStorage.setItem('taskState', JSON.stringify(this.state))
  }

  toggleTaskVisible = () => {
    this.setState({showDone: !this.state.showDone}, this.filterTasks())
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date().toString()
      }
    })

    this.setState({tasks}, this.filterTasks())
  }

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não Informada!')
      return
    }
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    })

    this.setState({tasks, showDone: false}, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({tasks}, this.filterTasks)
  }

  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM')

    console.log(this.state)

    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.handleAddTask}
          onCancel={() => this.setState({handleAddTask: false})}
          onSave={this.addTask}
        />
        <ImageBackground source={imgHoje} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleTaskVisible}>
              <Icon
                name={this.state.showDone ? 'eye-slash' : 'eye'}
                size={30}
                color={globalStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>

        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Tasks
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.setState({handleAddTask: true})}
          activeOpacity={(0, 3)}>
          <Icon name="plus" size={20} color={globalStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 30 : 145,
  },

  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: globalStyles.colors.today,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
