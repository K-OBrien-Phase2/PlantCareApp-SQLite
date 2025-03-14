import * as SQLite from 'expo-sqlite';

export type Plant = {
  id: number;
  name: string;
  type: string;
}

export const addPlant = async (plantName: string, plantType: string)=> {
try{
  console.log("PLANT: ", plantName, plantType);
  const db = await SQLite.openDatabaseAsync('plants.db');
   await db.execAsync(
      `CREATE TABLE IF NOT EXISTS plants (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        type TEXT
      );`
    );
 const result =  await db.runAsync('INSERT INTO plants (name, type) VALUES (?, ?)', plantName, plantType);
  console.log('Plant:',result.lastInsertRowId, result.changes);
  } catch(error) {
    console.error("Error:",error)
  }
}

export const getAllPlants = async ()=> {
  const db = await SQLite.openDatabaseAsync('plants.db');
  await db.execAsync(
     `CREATE TABLE IF NOT EXISTS plants (
       id INTEGER PRIMARY KEY AUTOINCREMENT, 
       name TEXT NOT NULL, 
       type TEXT
     );`
   );
  try{
     const allRows: Plant[] | null = await db.getAllAsync('SELECT * FROM plants');
     if(allRows){
      for (const row of allRows) {
        console.log(row.id, row.name, row.type);
      }
     }
     return allRows
   } catch(error) {
      console.error("Error inside getALLPlants:",error)
    }
  }

export default function expoSQLite (){
  return null
}