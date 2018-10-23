import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

export type location = {
    coords: coordinates,
    zipcode: number,
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
        return this.geolocation.getCurrentPosition().then(pos => {
            console.log("pos", pos);

            let coords: coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude };
            /*
            let url = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${this.appid}&units=metric&lang=fr`;
            let promise = this.http.get(url).toPromise();

            promise.then(data => {
                console.log(data)
                this.currentLat = data.coord.lat;
                this.currentLong = data.coord.lon;
                this.temperature = data.main.temp;
                this.meteo = data.weather[0].description;
                this.location = data.name;
                this.icone_meteo = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                this.errorVisible = false;
                this.resultVisible = true;
            }).catch((err) => {
                this.resultVisible = false;
                this.errorVisible = true;
            });

            return {
                coords: { lat: data.coords.latitude, lon: data.coords.longitude },
                zipcode: data.zipcode,
                name: data.city

            };
            */

            let p: location;
            return p;
        });
    }

}