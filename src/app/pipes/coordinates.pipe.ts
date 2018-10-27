import { Pipe, PipeTransform } from '@angular/core';
import { coordinates } from '../services/geolocation.service';

@Pipe({
    name: 'coordinatesPipe'
})

export class coordinatesPipe implements PipeTransform {
    transform(coords: coordinates): string {
        return `(${coords.lat.toFixed(2)},${coords.lon.toFixed(2)})`;
    }
} 