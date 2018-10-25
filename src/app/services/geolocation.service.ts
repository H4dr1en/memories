import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

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

    private appid: string = "dbb9d2574e40052026e845cabcb44965";

    constructor(public http: HttpClient, public geolocation: Geolocation) { }

    getLocation(): Promise<location> {
        return new Promise((resolve, reject) => {

            this.geolocation.getCurrentPosition().then(pos => {

                let loc: location = {
                    coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
                    zipcode: null,
                    name: ''
                }

                let url = `http://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.lat}&lon=${loc.coords.lon}&appid=${this.appid}&units=metric&lang=fr`;
                
                this.http.get(url).toPromise().then((data:any) => {
                    console.log(data)                    
                    loc.name = data.name;
                    resolve(loc);
                }).catch(reject);
            });
        });
    }
}