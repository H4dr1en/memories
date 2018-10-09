import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

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

    async selectMemories() {
        await this.dbReady;

        let query = 'select * from memories';
        return this.db.executeSql(query, []);
    }

    async updateMemory(memory: any) {
        await this.dbReady;

        let query = "UPDATE memories set Title = ?,  Description = ? WHERE ROWID = ?";
        return this.db.executeSql(query, [memory.title, memory.description, memory.id]);
    }

}

@Injectable()
export class memoryUpdater {

    memories: any = []

    constructor(protected DBS: DataBaseService) {
        this.DBS.selectMemories().then((result) => {
            for(let i = 0; i < result.rows.length; i++) {
                let row = result.rows.item(i);
                if(row !== undefined)
                    this.memories.push(row);
            }                
        }).catch(e => console.log(e));
    }

    createNewMemory(title, description) {
        let memory = {
            title: title,
            description: description
        };

        return this.DBS.insertNewMemory(memory).then(
            (result) => {   
                // TODO: correct push with insertId           
                this.memories.push(result.rows.item[0]);
            },
            (e) => console.error(e)
        );
    }
    //TODO Search with parameters

    get Memories() {
        //return this.DBS.selectMemories();     
        return this.memories;
    }

    async updateMemory(memory) {
        return this.DBS.updateMemory(memory)
            .then((result) => {
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