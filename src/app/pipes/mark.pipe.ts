import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mark'
})

export class MarkPipe implements PipeTransform {
    transform(value: number, mark: number): string {
        if (mark >= value) {
            return "star"
        }
        else {
            return "star-outline"
        }
    }
} 