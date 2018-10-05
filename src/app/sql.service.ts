import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class memorieUpdater {

    createNewMemorie() { }
    getMemories() { }
    updateMemorie() { }

}

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

    //TODO
    //functions to handle db (insert, select, update)
    //functions to manipulate memorie (new, search by title/date/tags/etc, edit)
    //link between both

    insertNewMemorie(memorie: any) { }

    selectMemories(params) { }

    updateMemorie(id) { }

}