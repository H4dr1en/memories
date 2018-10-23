import { Pipe, PipeTransform } from '@angular/core';
import { Memory } from '../memory.provider';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(memories: Memory[], filters: any): Memory[] {

        if (memories === undefined || memories === null) {
            return [];
        }

        if (filters.tags.length > 0) {
                memories = memories.filter(function (el) {   
                    /*  
                    if(filters.tags.some(tag1 => el.Tags.some(tag2 => tag1 == tag2))) {
                        return el.Title.toLowerCase().includes(filters.searchTerm.toLowerCase());
                    } else {
                        return false;
                    }
                    */
                   return filters.tags.some(tag1 => el.Tags.some(tag2 => tag1 == tag2));
                });
            }
        
        memories = memories.filter(function(el) {
            return el.Title.toLowerCase().includes(filters.searchTerm.toLowerCase());
        });

        memories = memories.filter(function(el) {
            return filters.marks.lower <= el.Mark && el.Mark <= filters.marks.upper;
        })

        return memories;
    }
}