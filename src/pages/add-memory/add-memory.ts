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
        console.log(this.mem)
        this.memoryProvider.createNewMemory(this.mem);
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemoryPage');
    }

    ionViewWillEnter() {
        this.geoloc.getLocation().then(loc => {
            this.mem.Location = loc;
        }).catch(console.error);
    }

}
