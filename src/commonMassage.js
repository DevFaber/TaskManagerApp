import {Alert, Platform} from 'react-native'

const server = 'http://10.0.2.2:3000'
// Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
  Alert.alert('Ops! Ocorreu um erro!', `Mensagem: ${err}`)
}

function showSuccess(msg) {
  Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}
