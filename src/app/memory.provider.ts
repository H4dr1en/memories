import { Injectable } from '@angular/core';
import { DataBaseService } from './services/sql.service'
import { location } from './services/geolocation.service';

export type Memory = {
    rowid: number;
    Title: string;
    Description: string;
    Location: location;
    Mark: number;
    Date: Date;
    Tags: string[];
    Bookmark: number;
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
                    row.Mark = 3
                    this.memories.push(row);
                    this.DBS.selectTags(row.rowid).then((result) => {
                        for (let i = 0; i < result.rows.length; i++) {
                            let tag = result.rows.item(i).Tag;                            
                            if (tag !== undefined) {
                                this.memories[this.memories.indexOf(row)].Tags.push(tag)
                            }
                        }
                    }).catch(e => console.error("ERROR", e));
                }
            }
        }).catch(e => console.error("SQLITE ERROR", e));
    }

    async createNewMemory(memory: Memory) {
        return this.DBS.insertNewMemory(memory).then((result) => { 
            if (result.insertId) {
                memory.rowid = result.insertId;
                if (memory.Tags !== undefined && memory.Tags.length > 0) {
                    this.DBS.insertTags(memory.rowid, memory.Tags).then(() => {
                        this.memories.push(memory)
                    }).catch(e => console.error("SQLITE ERROR", e))
                } else {
                    this.memories.push(memory);
                }
            }
        }).catch(e => console.error("SQLITE ERROR", e));
    }

    async deleteMemory(memory: Memory) {
        return this.DBS.deleteMemory(memory).then((result) => {
            this.memories.splice(this.memories.indexOf(memory), 1);
            this.DBS.deleteTag(memory.rowid)
        }).catch(e => console.error("SQLITE ERROR", e))
    }

    async updateMemory(memory: Memory, tagsToInsert?: string[], tagsToDelete?: string[]) {
        let promises = []
        promises.push(this.DBS.updateMemory(memory));

        if (tagsToInsert.length > 0) {
            promises.push(this.DBS.insertTags(memory.rowid, tagsToInsert));
        }
        if (tagsToDelete.length > 0) {
            promises.push(this.DBS.deleteTag(memory.rowid, tagsToDelete));
        }

        return Promise.all(promises).then(() => {
            this.memories[this.memories.indexOf(memory)] = memory;
        }).catch(e => console.error("SQLITE ERROR", e));
    }
}