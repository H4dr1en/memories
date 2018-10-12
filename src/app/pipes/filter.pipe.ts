import { Pipe, PipeTransform } from '@angular/core';
import { Memory } from '../sql.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(memories: any[], filters: any): Memory[] {

        if (memories === undefined || memories === null) {
            return [];
        }

        return memories.filter(function (el) {
            return el.Title.toLowerCase().includes(filters.searchTerm.toLowerCase());
        });

    }

} 