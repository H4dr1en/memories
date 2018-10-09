import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

//TODO error handling

@Injectable()
export class DataBaseService {

    db: any

    constructor(private sqlite: SQLite) { }

    initiateDB() {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                this.db = db;
                db.executeSql('create table if not exists memories(Title VARCHAR(32), Description VARCHAR(550),Location VARCHAR(150),Mark INT, Tags VARCHAR(150))', [])
                    .then(() => console.log('Executed SQL'))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    insertNewMemorie(memorie: any) {
        let query = "INSERT INTO memories (Title, Description) VALUES (?,?)";
        return this.db.executeSql(query, [memorie.title, memorie.description]);
    }

    selectMemories() {
        let query = 'select * from memories';
        return this.db.executeSql(query);
    }

    updateMemorie(memorie: any) {
        let query = "UPDATE memories set Title = ?,  Description = ? WHERE ROWID = memorie.id";
        return this.db.executeSql(query, [memorie.title, memorie.description, memorie.id]);
    }

}

@Injectable()
export class memorieUpdater {
    memories: any = []
    constructor(protected DBS: DataBaseService) {
        this.DBS.selectMemories().then((tx, result) => {
            result.rows.forEach(memorie => {
                this.memories.push(memorie);
            });
        }).catch(e => console.log(e));
    }

    createNewMemorie(title, description) {
        let memorie = {
            title: title,
            description: description
        };
        return this.DBS.insertNewMemorie(memorie)
            .then((tx, result) => {
                this.memories.push(result.rows.item[0]);
            })
            .catch(e => console.error(e));
    }
    //TODO Search with parameters

    /* getMemories() {
        return this.DBS.selectMemories()
    } */

    updateMemorie(memorie) {
        return this.DBS.updateMemorie(memorie)
            .then((tx, result) => {
                for (let i = 0; i < this.memories.length; i++) {
                    if (this.memories[i].id == result.rows.item[0].id) {
                        this.memories.splice(i, 1);
                        this.memories.push(result.rows.item[0]);
                        break;
                    }
                }
            })
            .catch(e => console.error(e));
    }

}