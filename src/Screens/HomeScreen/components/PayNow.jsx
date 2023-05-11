import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const PayNow = ({route}) => {
  const {  title, price } = route.params;
  return (
    <View style={styles.container}>
     <Text style={styles.title1}>{title}</Text>
      <Text style={styles.title1}>{price}</Text>
      <Text style={styles.title2}>Enter Payment Details</Text>
      <TextInput style={styles.input} placeholder="Name on card" />
      <TextInput style={styles.input} placeholder="Card number" />
      <TextInput style={styles.input} placeholder="Expiration date" />
      <TextInput style={styles.input} placeholder="Security code" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PayNow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title1: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 20,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});