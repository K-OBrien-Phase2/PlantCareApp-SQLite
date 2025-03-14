import * as SQLite from 'expo-sqlite'

export type Plant = {
  id: number
  name: string
  type: string
}

export const addPlant = async (plantName: string, plantType: string) => {
  try {
    console.log('PLANT: ', plantName, plantType)
    const db = await SQLite.openDatabaseAsync('plants.db')
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS plants (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        type TEXT
      );`
    )
    const result = await db.runAsync(
      'INSERT INTO plants (name, type) VALUES (?, ?)',
      plantName,
      plantType
    )
    console.log('Plant:', result.lastInsertRowId, result.changes)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getAllPlants = async () => {
  const db = await SQLite.openDatabaseAsync('plants.db')
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS plants (
       id INTEGER PRIMARY KEY AUTOINCREMENT, 
       name TEXT NOT NULL, 
       type TEXT
     );`
  )
  try {
    const allRows: Plant[] | null = await db.getAllAsync('SELECT * FROM plants')
    if (allRows) {
      for (const row of allRows) {
        console.log(row.id, row.name, row.type)
      }
    }
    return allRows
  } catch (error) {
    console.error('Error inside getALLPlants:', error)
  }
}

export const getPlant = async (plantId: string) => {
  try {
    const db = await SQLite.openDatabaseAsync('plants.db')
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS plants (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL, 
          type TEXT
        );`
    )
  
    const firstRow: Plant| null = await db.getFirstAsync('SELECT * FROM plants WHERE id = $id',{
      $id: plantId,
    });
    console.log(firstRow?.id, firstRow?.name, firstRow?.type);
    return firstRow
  } catch (error) {
    console.error('Error:', error)
  }
}

export const deletePlant = async (plantId: Number) => {// TODO: change to a string
  try {
    const db = await SQLite.openDatabaseAsync('plants.db')
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS plants (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL, 
          type TEXT
        );`
    )
    await db.runAsync('DELETE FROM plants WHERE id = $id', {
      $id: String(plantId),
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export const editPlant = async (plantId: string, plantName: string, plantType: string) => {
  try {
    console.log('PLANT: ', plantId, plantType)
    const db = await SQLite.openDatabaseAsync('plants.db')
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS plants (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL, 
            type TEXT
          );`
    )
    await db.runAsync('UPDATE plants SET name = ?, type = ? WHERE id = ?;', 
      plantName,
      plantType,
      plantId,
    ) 
  } catch (error) {
    console.error('Error:', error)
  }
}

export default function expoSQLite() {
  return null
}
