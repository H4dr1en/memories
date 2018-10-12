import { Pipe, PipeTransform } from '@angular/core';
import { Memory } from '../sql.service';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(memories: any[], filters: any): Memory[] {

        if (memories === undefined || memories === null) {
            return [];
        }

        if (filters.tags.length == 0) {
            return memories.filter(function (el) {
                return el.Title.toLowerCase().includes(filters.searchTerm.toLowerCase());
            });
        } else {
            return memories.filter(function (el) {     
                if(filters.tags.some(tag => el.Tags.includes(tag))) {
                    console.log(el, filters);
                    return el.Title.toLowerCase().includes(filters.searchTerm.toLowerCase());
                } else {
                    return false;
                }
            });
        }
    }
}