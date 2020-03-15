import React, {Component} from 'react'
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'

import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import globalStyles from '../GlobalStyles'
import AuthInput from '../components/AuthInput'
import {server, showError, showSuccess} from '../commonMassage'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  instance: false,
}

export default class Auth extends Component {
  state = {
    ...initialState,
  }

  checkSign = () => {
    if (this.state.instance) {
      this.signup()
    } else {
      Alert.alert('Sucesso!', 'Fazer Login')
    }
  }

  signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      })

      showSuccess('Usuário cadastrado!')
      this.setState({...initialState})
    } catch (error) {
      showError(error)
      this.setState({...initialState})
    }
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.instance ? 'Crie sua conta' : 'Acesse sua conta'}
          </Text>
          {this.state.instance && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          <AuthInput
            icon="at"
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <AuthInput
            icon="lock"
            placeholder="Senha"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
            style={styles.input}
          />
          {this.state.instance && (
            <AuthInput
              icon="asterisk"
              placeholder="Confirmar Senha"
              value={this.state.confirmPassword}
              onChangeText={confirmPassword => this.setState({confirmPassword})}
              secureTextEntry={true}
              style={styles.input}
            />
          )}
          <TouchableOpacity onPress={this.checkSign}>
            <View style={styles.button}>
              <Text style={styles.buttomText}>
                {this.state.instance ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({instance: !this.state.instance})}>
            <Text style={styles.instanceButton}>
              {this.state.instance
                ? 'Já possui uma conta?'
                : 'Ainda não possui conta?'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: globalStyles.fontFamilyB,
    color: globalStyles.colors.secondary,
    fontSize: 70,
  },
  subtitle: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    width: '80%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#EEE',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#040',
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttomText: {
    fontFamily: globalStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
  instanceButton: {
    fontFamily: globalStyles.fontFamily,
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
})
