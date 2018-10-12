import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable, Type } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

export type Memory = {
    rowid: number;
    Title: string;
    Description: string;
    Location: string;
    Mark: number;
    Date: Date;
    Tags: string[];
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

        let promise = this.db.executeSql('create table if not exists memories(Title VARCHAR(32), Description VARCHAR(550),Location VARCHAR(150),Mark INT, Date VARCHAR(100))', [])
            .then(() => {
                this.db.executeSql('create table if not exists tags(MemId INT,Tag VARCHAT(50),FOREIGN KEY(MemId) reference memories(rowid))', [])
                    .then(() => console.log('Tags ready'))
                    .catch((e) => console.log(e))
            })
            .catch((e) => console.log(e));
        return promise;
    }

    async insertNewMemory(memory: Memory) {
        await this.dbReady;

        let query = "INSERT INTO memories (Title, Description, Date) VALUES (?,?,?)";
        return this.db.executeSql(query, [memory.Title, memory.Description, memory.Date.toString()]);
    }

    async selectMemories(id?: number) {
        await this.dbReady;
        let params = [];
        let query = '';
        if (id !== undefined) {
            params = [id];
            query = 'select rowid,* from memories where ROWID = ?';
        } else {
            query = 'select rowid, * from memories';
        }
        return this.db.executeSql(query, params);
    }

    async updateMemory(memory: Memory) {
        await this.dbReady;

        let query = "UPDATE memories set Title = ?,  Description = ? WHERE ROWID = ?";
        return this.db.executeSql(query, [memory.Title, memory.Description, memory.rowid]);
    }

    async deleteMemory(memory: Memory) {
        await this.dbReady;

        let query = "DELETE FROM memories WHERE ROWID = ?";
        return this.db.executeSql(query, [memory.rowid]);
    }

    async selectTags(MemId: number) {
        await this.dbReady;

        let query = 'select Tag from tags where MemId = ?';
        return this.db.executeSql(query, [MemId]);
    }

    async deleteTag(MemId: number, Tags?: string[]) {
        await this.dbReady;
        let params: any[] = [MemId]
        let query = ''
        if (Tags !== undefined && Tags.length > 0) {
            query = 'delete from tags where MemId = ? and ';
            let values = []
            Tags.forEach(tag => {
                params.push(tag)
                values.push('Tag = ?')
            })
            query += values.join(' OR ')
        } else {
            query = 'delete from tags where MemId = ?'
        }
        return this.db.executeSql(query, params);
    }

    async insertTags(MemId: number, Tag: string[]) {
        await this.dbReady;
        let query = 'insert into tags (MemId, Tag) ';
        let params = [];
        let values = [];
        Tag.forEach(tag => {
            values.push('VALUES(?,?)');
            params.push(MemId);
            params.push(tag);
        })
        query += values.join(',')
        return this.db.executeSql(query, params);
    }

}



@Injectable()
export class memoryProvider {

    memories: Memory[] = [];

    constructor(protected DBS: DataBaseService) {
        this.DBS.selectMemories().then((result) => {
            for (let i = 0; i < result.rows.length; i++) {
                let row = result.rows.item(i);
                if (row !== undefined) {
                    row.Date = new Date(row.Date);
                    row['Tags'] = []
                    this.memories.push(row);
                    this.DBS.selectTags(row.rowid).then((result) => {
                        for (let i = 0; i < result.rows.length; i++) {
                            let tag = result.rows.item(i);
                            if (tag !== undefined) {
                                this.memories[this.memories.indexOf(row)].Tags.push(tag)
                            }
                        }
                    }).catch(e => console.log(e));
                }
            }
        }).catch(e => console.log(e));
    }

    async createNewMemory(memory: Memory) {
        return this.DBS.insertNewMemory(memory).then((result) => {
            if (result.insertid) {
                if (memory.Tags.length > 0) {
                    this.DBS.insertTags(memory.rowid, memory.Tags).then(() => {
                        this.memories.push(memory)
                    }).catch(e => console.log(e))
                }
            }
        }).catch(e => console.log(e));
    }

    async deleteMemory(memory: Memory) {
        return this.DBS.deleteMemory(memory).then((result) => {
            this.memories.splice(this.memories.indexOf(memory), 1);
            this.DBS.deleteTag(memory.rowid)
        }).catch((e) => console.log(e))
    }

    async updateMemory(memory: Memory, tagsToInsert?: string[], tagsToDelete?: string[]) {
        let promises = []
        promises.push(this.DBS.updateMemory(memory));
        promises.push(this.DBS.insertTags(memory.rowid, tagsToInsert));
        promises.push(this.DBS.deleteTag(memory.rowid, tagsToDelete));
        return Promise.all(promises).then(() => {
            this.memories[this.memories.indexOf(memory)] = memory;
        }).catch((e) => console.log(e));
    }

    
    filterItems(searchTerm) {
 
        return this.memories.filter((mem) => {
            return mem.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
    }
}