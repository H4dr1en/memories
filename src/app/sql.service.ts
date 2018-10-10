import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable, Type } from '@angular/core';

export type Memory = {
    id: number;
    Title: string;
    Description: string;
    Location: string;
    Mark: number;
    Tags: string;
    Date : Date;
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

        let promise = this.db.executeSql('create table if not exists memories(Title VARCHAR(32), Description VARCHAR(550),Location VARCHAR(150),Mark INT, Tags VARCHAR(150), Date VARCHAR(100))', []);
        promise.then(() => console.log('SQLite ready'));
        promise.catch((e) => console.log(e));
        return promise;

    }

    async insertNewMemory(memory: any) {
        await this.dbReady;

        let query = "INSERT INTO memories (Title, Description,Date) VALUES (?,?,?)";
        return this.db.executeSql(query, [memory.title, memory.description, memory.Date.toString()]);
    }

    async selectMemories(id?: number) {
        await this.dbReady;
        let params = [];
        let query = '';
        if (id) {
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

    async deleteMemory(memory: any) {
        await this.dbReady;

        let query = "DELETE FROM memories WHERE ROWID = ?";
        return this.db.executeSql(query, [memory.id]);
    }

}



@Injectable()
export class memoryUpdater {

    memories: Memory[] = [];

    constructor(protected DBS: DataBaseService) {
        this.DBS.selectMemories().then((result) => {
            for (let i = 0; i < result.rows.length; i++) {
                let row = result.rows.item(i);
                if (row !== undefined)
                    row.Date = new Date(row.Date);
                    this.memories.push(row);
            }
        }).catch(e => console.log(e));
    }

    async createNewMemory(memory: Memory) {
        return this.DBS.insertNewMemory(memory).then(
            (result) => {
                this.DBS.selectMemories(result.insertId).then((result) => {
                    this.memories.push(result.rows.item[0]);
                })
                    .catch(e => console.log(e));
            },
            (e) => console.error(e)
        );
    }

    filterMemories() {

    }

    async deleteMemory(memory) {
        return this.DBS.deleteMemory(memory).then((result) => {
            this.memories.splice(this.memories.indexOf(memory), 1);
        })
    }

    async updateMemory(memory) {
        return this.DBS.updateMemory(memory)
            .then((result) => {
                this.memories[this.memories.indexOf(memory)] = result.rows.item[0];
            })
            .catch((e) => console.error(e));
    }

}