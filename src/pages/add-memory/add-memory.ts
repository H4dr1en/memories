import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryProvider, Memory } from '../../app/memory.provider'
import { GeoLocService, location, coordinates } from '../../app/services/geolocation.service'

/**
 * Generated class for the AddMemoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let Microsoft: any;

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
                coords: {} as coordinates,
                zipcode: '',
                name: ''
            },
            Mark: 0,
            Tags: [],
            Date: undefined,
            Bookmark: 0
        }
    }

    addMemory() {
        this.mem.Date = new Date();

        console.log("loc", this.mem.Location)

        let p = Promise.resolve({} as location);

        if (Object.keys(this.mem.Location.coords).length == 0) {
            p = this.geoloc.getLocationWithName(this.mem.Location.name)
        }

        p.then(() => {
            this.memoryProvider.createNewMemory(this.mem);
            this.navCtrl.pop()
        }).catch(e => {
            this.memoryProvider.createNewMemory(this.mem);
            this.navCtrl.pop()
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemoryPage');
    }

    ionViewWillEnter() {
        this.geoloc.getGPSCoords().then(this.geoloc.getLocation).catch(console.error);
    }

    ionViewDidEnter() {
    }

}
