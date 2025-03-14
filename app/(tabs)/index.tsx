import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import { getAllPlants, Plant } from '../utils/expoSQLiteUtils' //TODO: make a types folder
import { Colors } from '../../constants/Colors'//TODO: set all colors in the colors folder

export default function HomeScreen() {

  const [plants, setPlants] = useState<Plant[]>([])
  const [welcomeStatement, setWelcomeStatement] = useState(`Welcome to your plant's index!\nAdd a plant to get started!`)
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(() => {
    loadPlants()
  }, [])

  // Load plants from expoSQLite
  const loadPlants = async () => {
    try {
      const storedPlants = await getAllPlants()
      if (storedPlants) {
        setPlants(storedPlants)
        setWelcomeStatement(`Welcome back!\nIs it time to check on your plants?`)
      }
    } catch (error) {
      console.error('Error loading plants:', error)
    }
  }

  // Render Plant Item
  const renderItem = (item: Plant) => {
    return(
      <View style={styles.plantItemRow}>
        <Text style={styles.plantItemIcon}>🪴</Text>
        <View style={styles.plantItemColumn}>
          <Text style={styles.plantItemName}>{item.name}</Text>
          <Text style={styles.plantItemType}>{item.type}</Text>
        </View>
      </View>
    )
  }
  // onRefresh
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      loadPlants()
      setRefreshing(false)
    }, 200)
  }
  return (
    <View style={styles.view}>
        <Text style={styles.text}>{welcomeStatement}</Text>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => renderItem(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['white']}
              progressBackgroundColor={'green'}/>
          }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  list: {
    flex:1,
    flexGrow: 1,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingBottom: 40,
    fontSize: 20,
  },
  plantItem: {
    flex:1,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    padding: 20
  },
  plantItemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 20
  },
  plantItemColumn: {
    flex:1,
  },
  plantItemName: {
    fontSize: 20,
    fontWeight: 500,
  },
  plantItemType: {
    fontSize: 20,
    fontWeight: 300,
  },
  plantItemIcon: {
    fontSize: 20,
    alignSelf: 'center',
    paddingRight: 20,
  }
})
