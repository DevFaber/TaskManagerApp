import React, {Component} from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import globalStyles from '../GlobalStyles'
import imgHoje from '../../assets/imgs/today.jpg'

export default class TaskPage extends Component {
  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM')

    return (
      <View style={styles.container}>
        <ImageBackground source={imgHoje} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>

        <View style={styles.taskList}>
          <Text>Tarefa #01</Text>
          <Text>Tarefa #02</Text>
          <Text>Tarefa #03</Text>
        </View>
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
})
