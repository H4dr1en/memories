import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Memory } from '../memory.provider';

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
            console.error(error);
        }

        // DEBUG: Uncomment to refresh table structure
        /*
        return this.db.executeSql('DROP TABLE IF EXISTS memories', []).then(() => {
            this.db.executeSql('DROP TABLE IF EXISTS tags', [])
        }).catch(e => console.error("SQLITE ERROR", e))
        */

        let promise = this.db.executeSql('create table if not exists memories(Title VARCHAR(32), Description VARCHAR(550),Location VARCHAR(150),Mark INT, Date VARCHAR(100), Bookmark INTEGER)', [])
            .then(() => {
                this.db.executeSql('create table if not exists tags(MemId INT,Tag VARCHAT(50),FOREIGN KEY(MemId) REFERENCES memories(rowid))', [])
            })
            .then(() => console.log('Tags ready'))
            .catch(e => console.error("SQLITE ERROR", e));
        return promise;
    }

    async insertNewMemory(memory: Memory) {
        await this.dbReady;

        let query = "INSERT INTO memories (Title, Description, Date, Mark, Bookmark) VALUES (?,?,?,?,?)";
        return this.db.executeSql(query, [memory.Title, memory.Description, memory.Date.toString(), memory.Mark, 0]);
    }

    async selectMemories(id?: number) {
        await this.dbReady;
        let params = [];
        let query = '';
        if (id !== undefined) {
            params = [id];
            query = 'select rowid, * from memories where ROWID = ?';
        } else {
            query = 'select rowid, * from memories';
        }
        return this.db.executeSql(query, params);
    }

    async updateMemory(memory: Memory) {
        await this.dbReady;

        let query = "UPDATE memories set Title = ?,  Description = ?, Bookmark = ?, Mark = ? WHERE ROWID = ?";
        return this.db.executeSql(query, [memory.Title, memory.Description, memory.Bookmark, memory.Mark, memory.rowid]);
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