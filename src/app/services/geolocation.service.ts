import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

export type location = {
    coords: coordinates,
    zipcode: string,
    name: string
}

export type coordinates = {
    lat: number,
    lon: number
}

@Injectable()
export class GeoLocService {

    constructor(public geolocation: Geolocation, private http: HTTP) { }

    getGPSCoords(): Promise<coordinates> {
        return new Promise((resolve, reject) => {

            this.geolocation.getCurrentPosition({ timeout: 5000 }).then(pos => {
                let coords: coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude }
                resolve(coords);
            }).catch(reject);
        });
    }

    getLocation(coords: coordinates): Promise<location> {
        return new Promise((resolve, reject) => {
            let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}`;

            console.log(url)

            this.http.get(url, {}, {}).then((data: any) => {
                let loc: location = {
                    coords: coords,
                    zipcode: data.address.postcode,
                    name: data.address.city
                }
                resolve(loc);
            }).catch(reject);
        });
    }

    getLocationWithName(name: string): Promise<location> {
        return new Promise((resolve, reject) => {
            let url = `https://nominatim.openstreetmap.org/search?q=${name}&format=json`;

            console.log(url)

            this.http.get(url, {}, {}).then((res: any) => {
                let data = JSON.parse(res.data);
                if (data.length == 0) {
                    reject("Not found")
                }
                else {
                    this.getLocation({lat: data[0].lat, lon: data[0].lon}).then(resolve).catch(reject);
                }
            }).catch(reject);
        });
    }
}