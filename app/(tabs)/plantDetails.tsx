import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native'
import { addPlant, editPlant, getPlant } from '../utils/expoSQLiteUtils'
import { router, useGlobalSearchParams } from 'expo-router'

export default function plantDetails() {
  const [plantName, setPlantName] = useState('')
  const [plantType, setPlantType] = useState('')
  const params = useGlobalSearchParams()

  useEffect(() => {
    loadPlants()
  }, [params.id])

  // Load plants from expoSQLite
  const loadPlants = async () => {
    try {
      const storedPlant = await getPlant(String(params.id))
      setPlantName(storedPlant?.name ?? '')
      setPlantType(storedPlant?.type ?? '')
    } catch (error) {
      console.error('Error loading plants:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Plant Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />
      <Text>Plant Type: </Text>
      <TextInput
        style={styles.input}
        placeholder="Plant Type"
        value={plantType}
        onChangeText={setPlantType}
      />
      <TouchableOpacity
        onPress={async () => {
          router.push({
            pathname: '/',
          })
          await editPlant(String(params.id), plantName, plantType)
          setPlantName('')
          setPlantType('')
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit Your Plant</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
  },
})
