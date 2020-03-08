import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import globalStyles from '../GlobalStyles'

export default function Tasks(props) {
  const checkDone =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {}

  const date = props.doneAt ? props.doneAt : props.estimateAt
  const formattedDate = moment(date)
    .locale('pt-BR')
    .format('ddd, D [de] MMMM [de] YYYY')

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          {/* Comunicação Indireta: o componente tasks recebe uma função como parametro que notifica o componente TaskPage quando ocorre um evento no componente filho fazendo dessa  forma a alteração no estado do componente pai */}
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={[styles.title, checkDone]}>{props.desc}</Text>
          <Text style={styles.subtitle}>{formattedDate}</Text>
        </View>
      </View>
    </Swipeable>
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
const getRightContent = () => {
  return (
    <TouchableOpacity
      onPress={() => props.onDelete && props.onDelete(props.id)}
      style={styles.right}>
      <Icon name="trash" size={20} color="#FFF" />
    </TouchableOpacity>
  )
}
const getLeftContent = () => {
  return (
    <View style={styles.left}>
      <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
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

  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },

  excludeText: {
    fontFamily: globalStyles.fontFamilyB,
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
    marginRight: 15,
  },
})
