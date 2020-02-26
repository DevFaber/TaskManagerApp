import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import globalStyles from '../GlobalStyles'

export default function Tasks(props) {
  const checkDone =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {}

  const date = props.doneAt ? props.doneAt : props.estimateAt

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
        {/* Comunicação Indireta: o componente tasks recebe uma função como parametro que notifica o componente TaskPage quando ocorre um evento no componente filho fazendo dessa  forma a alteração no estado do componente pai */}
        <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      </TouchableWithoutFeedback>

      <View>
        <Text style={[styles.title, checkDone]}>{props.desc}</Text>
        <Text style={styles.subtitle}>{date}</Text>
      </View>
    </View>
  )
}

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#FFF" />
      </View>
    )
  } else {
    return <View style={styles.pending} />
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: globalStyles.fontFamily,
    fontWeight: 'bold',
    fontSize: 15,
    color: globalStyles.colors.mainText,
  },
  subtitle: {
    fontFamily: globalStyles.fontFamily,
    color: globalStyles.colors.subText,
  },
  pending: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#009900',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
