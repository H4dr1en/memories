import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable, Type } from '@angular/core';

export type Memory = {
    id: number;
    Title: string;
    Description: string;
    Location: string;
    Mark: number;
    Tags: string;
}

//TODO error handling

@Injectable()
export class DataBaseService {

    db: SQLiteObject;
    dbReady: Promise<any>;

    constructor(private sqlite: SQLite) {
        this.dbReady = this.initDB();
    }

    async initDB() {

        try {
            this.db = await this.sqlite.create({
                name: 'data.db',
                location: 'default'
            });
        } catch (error) {
            console.log(error);
        }
        
        //return this.db.executeSql('drop table memories', []);
        
        let promise = this.db.executeSql('create table if not exists memories(Title VARCHAR(32), Description VARCHAR(550),Location VARCHAR(150),Mark INT, Tags VARCHAR(150))', []);
        promise.then(() => console.log('SQLite ready'));
        promise.catch((e) => console.log(e));
        return promise;
        
    }

    async insertNewMemory(memory: any) {
        await this.dbReady;

        let query = "INSERT INTO memories (Title, Description) VALUES (?,?)";
        return this.db.executeSql(query, [memory.title, memory.description]);
    }

    async selectMemories(id? : string) {
        await this.dbReady;
        let params = [];
        let query = '';
        if(id){
            params = [id];
            query = 'select rowid,* from memories where ROWID = ?';
        } else {
            query = 'select rowid, * from memories';
        }
        return this.db.executeSql(query, params);
    }

    async updateMemory(memory: any) {
        await this.dbReady;

        let query = "UPDATE memories set Title = ?,  Description = ? WHERE ROWID = ?";
        return this.db.executeSql(query, [memory.title, memory.description, memory.id]);
    }

}



@Injectable()
export class memoryUpdater {        

    memories: Memory[] = [];

    constructor(protected DBS: DataBaseService) {
        this.DBS.selectMemories().then((result) => {
            for(let i = 0; i < result.rows.length; i++) {
                let row = result.rows.item(i);
                if(row !== undefined)
                    this.memories.push(row);
            }                
        }).catch(e => console.log(e));
    }

    createNewMemory(memory: Memory) {

        return this.DBS.insertNewMemory(memory).then(
            (result) => {   
                this.DBS.selectMemories(result.insertId).then((result)=>{
                    this.memories.push(result.rows.item[0]);
                })           
                .catch(e => console.log(e));
            },
            (e) => console.error(e)
        );
    }

    async updateMemory(memory) {
        return this.DBS.updateMemory(memory)
            .then((result) => {
                console.log(result);
                for (let i = 0; i < this.memories.length; i++) {
                    
                    if (this.memories[i].id == result.rows.item[0].id) {
                        this.memories.splice(i, 1);
                        this.memories.push(result.rows.item[0]);
                        break;
                    }
                }
            })
            .catch((e) => console.error(e));
    }
    
}