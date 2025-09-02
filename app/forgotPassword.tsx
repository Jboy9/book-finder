import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const forgotpassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>forgotpassword</Text>

      <View>
        <Text style={styles.belowText}> Enter your registered email address or  phone number. We'll send you a link to reset your password.</Text>
      </View>
    </View>
  )
}

export default forgotpassword

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
    },
    Text: {
      color: "#0000",
      fontWeight: 'bold',
      fontSize: 25,
      marginTop: 10,
    },
    belowText:{
      fontSize: 12,
      fontWeight: 'regular',
    },
    button1: {
    backgroundColor: '#dfe9efff',
    borderRadius: 25,
    padding: 12,
    marginTop: 15,
    }
})