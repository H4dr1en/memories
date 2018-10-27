import { Pipe, PipeTransform } from '@angular/core';
import { Memory } from '../memory.provider';
import { FilterOrder } from '../../pages/home/home';

@Pipe({
    name: 'sort',
    pure: false
})

export class SortPipe implements PipeTransform {
    transform(memories: Memory[], opts ): Memory[] {
        
        if(memories === undefined || memories === null) {                         
            return [];
        }            
        
        //this.filterActive = this.filters.sortField.length > 0 ? true : false;

        if (opts.field == "Title") {
            if (opts.order == FilterOrder.Asc) {
                memories = memories.sort((a, b) => {
                    if (a.Title < b.Title) return -1;
                    if (a.Title > b.Title) return 1;
                    return 0;
                })
            } else {
                memories = memories.sort((a, b) => {
                    if (a.Title < b.Title) return 1;
                    if (a.Title > b.Title) return -1;
                    return 0;
                })
            }
        }
        else if (opts.field == "Date") {
            if (opts.order == FilterOrder.Asc) {
                memories = memories.sort((a, b) => b.Date.getTime() - a.Date.getTime());
            } else {
                memories = memories.sort((a, b) => a.Date.getTime() - b.Date.getTime());
            }
        }
        
        return memories;
    }
} 