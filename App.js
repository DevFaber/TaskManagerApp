import React from 'react'
import {StyleSheet, View, StatusBar, Text} from 'react-native'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      <View style={styles.container}>
        <Text style={styles.label}>GESTÃO DE TAREFAS</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f18000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
  },
})
