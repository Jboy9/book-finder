import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const index = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    router.push('/homeScreen');
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.inputText}> Email </Text>
       <Text style={styles.inputText}> Password </Text>
       <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}> Login </Text>
       </TouchableOpacity> */}

      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/profile-icon.png')} />
        <Text style={styles.logintText}>Login</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#4F58FF"
            />
          </TouchableOpacity>
        </View>

        {/* Already have an account and forgot password */}

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.alreadyHaveAccount}>Don't have an account? <Text onPress={() => router.push('/signup')}>Signup</Text></Text>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
      </View>

      {/* The OR and the underline */}
      <View style={styles.underlineContainer}>

        <View style={styles.line} />
        <Text>OR</Text>
        <View style={styles.line} />

      </View>

      {/* Other login method */}
      <View style={styles.loginMethodContainer}>
        <Image source={require('../assets/images/google-icon.png')} />
        <Image source={require('../assets/images/facebook-icon.png')} />
        <Image source={require('../assets/images/linkedin-icon.png')} />
      </View>

      {/* Login button */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  input: {
    // paddingHorizontal: 4,
    padding: 4,
    gap: 230,
    alignSelf: 'center',
    width: 337,
    height: 48,
    backgroundColor: '#EDEDED',
    borderRadius: 25,
    color: '#928C8C',
    textAlign: 'center',
    marginTop: 20
  },
  logintText: {
    color: 'black',
    fontSize: 18,
    marginTop: 12,
    fontWeight: 'bold'
  },
  alreadyHaveAnAccountText: {
    color: '#1B3E52',
    fontSize: 12,
    fontWeight: 'regular',
    fontFamily: 'Actor',
  },
  forgotPasswordText: {
    color: '#B5514D',
    fontSize: 12,
    fontWeight: 'regular',
    fontFamily: 'Actor'
  },
  inputContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1B3E52',
    borderRadius: 25,
    padding: 12,
    marginTop: 60
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center'
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  alreadyHaveAccount: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#1B3E52',
    textDecorationLine: 'underline'
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#B5514D',
    textDecorationLine: 'underline'
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  underlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 80
  },
  line: {
    backgroundColor: 'black',
    height: 1,
    width: 108
  },
  loginMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginTop: 40
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 18,
    top: 13,
    padding: 4,
    zIndex: 1,
  },
})
