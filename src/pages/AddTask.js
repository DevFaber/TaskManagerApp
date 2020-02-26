import React, {Component} from 'react'
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'

import globalStyles from '../GlobalStyles'

const initialState = {desc: ''}

export default class AddTask extends Component {
  state = {
    ...initialState,
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
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Text style={styles.buttonText} onPress={this.props.onCancel}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
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
})
