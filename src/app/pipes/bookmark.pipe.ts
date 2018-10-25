import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bookmark'
})

export class BookmarkPipe implements PipeTransform {
    transform(value: number): string {
        if (value == 1) {
            return "heart"
        }
        return "heart-outline"
    }
} 