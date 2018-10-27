import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

export type location = {
    coords: coordinates,
    name: string
}

export type coordinates = {
    lat: number,
    lon: number
}

@Injectable()
export class GeoLocService {

    private email: string = "alt.gi-ewb342y@yopmail.com";

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
            let url = `https://nominatim.openstreetmap.org/reverse?email=${this.email}&format=json&lat=${coords.lat}&lon=${coords.lon}`;

            this.http.get(url, {}, {}).then((res: any) => {
                let data = JSON.parse(res.data);
                let name = "";

                if (data.address.suburb)
                    name = data.address.suburb;

                else if (data.address.village)
                    name = data.address.village;

                else if (data.address.town)
                    name = data.address.town;

                else if (data.address.city_district)
                    name = data.address.city_district;

                else if (data.address.city)
                    name = data.address.city;

                else if (data.address.state_district)
                    name = data.address.state_district;

                else if (data.address.state)
                    name = data.address.state;

                else if (data.address.country)
                    name = data.address.country;

                else
                    name = "";

                let loc: location = {
                    coords: coords,
                    name: name
                }
                resolve(loc);
            }).catch(reject);
        });
    }

    getCoordsWithName(name: string): Promise<coordinates> {
        return new Promise((resolve, reject) => {
            let url = `https://nominatim.openstreetmap.org/search?email=${this.email}&q=${name}&format=json`;

            this.http.get(url, {}, {}).then((res: any) => {
                let data = JSON.parse(res.data);
                if (data.length == 0) {
                    reject("Not found")
                }
                else {
                    resolve({ lat: Number.parseFloat(data[0].lat), lon: Number.parseFloat(data[0].lon) });
                }
            }).catch(reject);
        });
    }
}