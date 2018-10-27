import { Pipe, PipeTransform } from '@angular/core';
import { ILatLng } from '@ionic-native/google-maps';

@Pipe({
    name: 'coordinatesPipe'
})

export class coordinatesPipe implements PipeTransform {
    transform(coords: ILatLng): string {
        return `(${coords.lat.toFixed(2)},${coords.lng.toFixed(2)})`;
    }
} 