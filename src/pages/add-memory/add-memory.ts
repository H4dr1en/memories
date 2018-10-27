import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryProvider, Memory } from '../../app/memory.provider'
import { GeoLocService, location } from '../../app/services/geolocation.service'
import { ILatLng } from '@ionic-native/google-maps';
import {Camera} from '@ionic-native/camera';


@IonicPage()
@Component({
    selector: 'page-add-memory',
    templateUrl: 'add-memory.html',
})
export class AddMemoryPage {

    mem: Memory;

    constructor(public navCtrl: NavController, public navParams: NavParams, public memoryProvider: memoryProvider, public geoloc: GeoLocService) {
        this.mem = {
            rowid: undefined,
            Title: "Last day in San Francisco",
            Description: "Johnny is so excited, while I'm really tired.",
            Location: {
                coords: {} as ILatLng,
                name: 'Locating...'
            },
            Mark: 1,
            Img: "",
            Tags: [],
            Date: undefined,
            Bookmark: 0
        }
    }

    addMemory() {
        this.mem.Date = new Date();

        if (Object.keys(this.mem.Location.coords).length == 0) {
            this.geoloc.getCoordsWithName(this.mem.Location.name).then((coords: ILatLng) => {
                this.mem.Location.coords = coords;
                this.memoryProvider.createNewMemory(this.mem);
                this.navCtrl.pop()
            }).catch(console.error);
        }
        else {
            this.memoryProvider.createNewMemory(this.mem);
            this.navCtrl.pop()
        }
    }

    takePicture(){

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemoryPage');
    }

    ionViewWillEnter() {
    }

    ionViewDidEnter() {
        this.geoloc.getGPSCoords()
            .then((coords: ILatLng) => this.geoloc.getLocation(coords))
            .then((loc: location) => this.mem.Location = loc)
            .catch(e => {
                this.mem.Location.name = "";
                console.error(e);
            });
    }

}
