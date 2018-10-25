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

        if (Object.keys(this.mem.Location.coords).length == 0) {
            this.geoloc.getLocationWithName(this.mem.Location.name).then((loc: location) => {
                this.mem.Location = loc
                this.memoryProvider.createNewMemory(this.mem);
                this.navCtrl.pop()
            }).catch(console.log);
        }
        else {
            this.memoryProvider.createNewMemory(this.mem);
            this.navCtrl.pop()
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemoryPage');
    }

    ionViewWillEnter() {
    }

    ionViewDidEnter() {
        // TODO : 1 query per second max
        this.geoloc.getGPSCoords().then(this.geoloc.getLocation).then((loc:location) => this.mem.Location).catch(console.log);
    }

}
