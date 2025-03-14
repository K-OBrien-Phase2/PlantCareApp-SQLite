import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Animated,
  PanResponder,
  Touchable,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { getAllPlants, Plant, deletePlant } from '../utils/expoSQLiteUtils' //TODO: make a types folder
import { router } from 'expo-router'
// import { Colors } from '../../constants/Colors'//TODO: set all colors in the colors folder

export default function HomeScreen() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [welcomeStatement, setWelcomeStatement] = useState(
    `Welcome to your plant's index!\nAdd a plant to get started!`
  )
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadPlants()
  }, [])

  // Load plants from expoSQLite
  const loadPlants = async () => {
    try {
      const storedPlants = await getAllPlants()
      if (storedPlants && storedPlants?.length > 0) {
        setPlants(storedPlants)
        setWelcomeStatement(
          `Welcome back!\nIs it time to check on your plants?`
        )
      } else {
        setPlants([])
        setWelcomeStatement(
          `Welcome to your plant's index!\nAdd a plant to get started!`
        )
      }
    } catch (error) {
      console.error('Error loading plants:', error)
    }
  }


  

  // Render Plant Item
  const renderItem = (item: Plant) => {
    // Pan responder: handles swipe-to-delete animation 
    const translateX = new Animated.Value(0)
    const panResponder = 
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        },
        onPanResponderMove: (_, gestureState) => {
          translateX.setValue(gestureState.dx)
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -50) {
            Animated.spring( translateX, {toValue: -100, useNativeDriver: true}).start()
          }
          else{
            Animated.spring( translateX, {toValue: 0, useNativeDriver: true}).start()
          }
        },
      })
    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX }],
        }}
      >
        <TouchableOpacity
          style={styles.plantItemRow}
          onPress={()=> {
            router.push({
              pathname: '/plantDetails',
              params: {
                id: item.id
              }
            })
          }}>
          <Text style={styles.plantItemIcon}>🪴</Text>
          <View>
            <Text style={styles.plantItemName}>{item.name}</Text>
            <Text style={styles.plantItemType}>{item.type}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePlant(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
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
    <SafeAreaView style={styles.view}>
      <Text style={styles.text}>{welcomeStatement}</Text>
      <FlatList
        style={styles.flatList}
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['white']}
            progressBackgroundColor={'green'}
          />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 100,
  },
  flatList: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingBottom: 40,
    fontSize: 20,
  },
  plantItem: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    padding: 20,
  },
  plantItemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: '#ccc',
    padding: 20,
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
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    position: 'absolute',
    right: -100,
    height: '100%',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 20,
  },
})
