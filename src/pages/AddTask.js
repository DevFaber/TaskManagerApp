import React, {Component} from 'react'
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import globalStyles from '../GlobalStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

const initialState = {
  desc: '',
  date: new Date(),
  showDatePicker: false,
}

export default class AddTask extends Component {
  state = {
    ...initialState,
  }

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    }
    this.props.onSave && this.props.onSave(newTask)
    this.setState({...initialState})
  }

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        mode="date"
      />
    )

    const dateString = moment(this.state.date).format('ddd, D [de] MMMM')

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => this.setState({showDatePicker: true})}>
            <Icon name="calendar" size={20} />
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      )
    }
    return datePicker
  }

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Adicionar Nova Tarefa </Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a Descrição ..."
            value={this.state.desc}
            onChangeText={desc => this.setState({desc})}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Text style={styles.buttonText} onPress={this.props.onCancel}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.buttonText}> Salvar </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: globalStyles.fontFamily,
    backgroundColor: globalStyles.colors.today,
    color: globalStyles.colors.secondary,
    fontSize: 23,
    textAlign: 'center',
    padding: 15,
  },
  input: {
    fontFamily: globalStyles.fontFamily,
    width: '95%',
    height: 40,
    marginTop: 15,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    fontWeight: 'bold',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  buttonText: {
    backgroundColor: globalStyles.colors.today,
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    fontSize: 18,
    padding: 10,
    margin: 15,
    borderRadius: 4,
    width: 100,
    textAlign: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 15,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    height: 40,
    width: '95%',
    paddingLeft: 5,
    borderRadius: 4,
  },
  date: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 15,
    marginLeft: 5,
  },
})
