import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { addPlant } from '../utils/expoSQLiteUtils'
import { router } from 'expo-router';

export default function AddAPlant() {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');

  return (
    <View style={styles.container}>
      <Text>Plant Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />
      <Text>Plant Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Plant Type"
        value={plantType}
        onChangeText={setPlantType}
      />
      <TouchableOpacity
        onPress={ async ()=> {
          router.push({
            pathname: '/'
          })
          await addPlant(plantName, plantType)
          setPlantName("")
          setPlantType("")
        }} 
        style={styles.button}>
        <Text style={styles.buttonText}>Add a Plant</Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 140,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'green'
  },
  buttonText: {
    color: 'white',
  }
});
