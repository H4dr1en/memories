import { Pipe, PipeTransform } from '@angular/core';
import { Memory } from '../memory.provider';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(memories: Memory[], filters: any): Memory[] {

        try {

            if (memories === undefined || memories === null) {
                return [];
            }

            if (filters.tags.length > 0) {
                memories = memories.filter(function (el) {
                    return filters.tags.some(tag1 => el.Tags.some(tag2 => tag1 == tag2));
                });
            }

            memories = memories.filter(function (el) {
                return el.Title.toLowerCase().includes(filters.searchTerm.toLowerCase());
            });

            memories = memories.filter(function (el) {
                return filters.marks.lower <= el.Mark && el.Mark <= filters.marks.upper;
            })

            memories = memories.filter(function (el) {
                return (filters.onlyBookmark == true && el.Bookmark == 1) || filters.onlyBookmark == false
            })

        } catch (e) {
            console.error(e);
        }

        return memories;
    }
}