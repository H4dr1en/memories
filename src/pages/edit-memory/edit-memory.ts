import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryProvider, Memory } from '../../app/memory.provider'
import { GeoLocService } from '../../app/services/geolocation.service';
import { ILatLng } from '@ionic-native/google-maps';


/**
 * Generated class for the EditMemoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-memory',
    templateUrl: 'edit-memory.html',
})
export class EditMemoryPage {

    mem: Memory
    tags: any[] = []
    tagsToRemove: any[] = []
    tagsToAdd: any[] = []
    previousLocName: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public memoryProvider: memoryProvider, public geoloc: GeoLocService) {
        this.mem = this.navParams.get('mem');
        this.tags = this.mem.Tags
        this.previousLocName = this.mem.Location.name;
    }

    editMemory() {
        if (this.previousLocName != this.mem.Location.name) {
            this.geoloc.getCoordsWithName(this.mem.Location.name).then((coords: ILatLng) => {
                this.mem.Location.coords = coords;
                this.saveAndQuit();
            }).catch(e => {
                console.error(e);
                this.saveAndQuit();
            });
        }
        else {
            this.saveAndQuit();
        }
    }

    saveAndQuit() {
        this.memoryProvider.updateMemory(this.mem, this.tagsToAdd, this.tagsToRemove);
        this.navCtrl.pop();
    }

    onTagChange() {
        this.tags.forEach(tag => {
            if (this.mem.Tags.indexOf(tag) && this.tagsToAdd.indexOf(tag) === -1) {
                this.tagsToAdd.push(tag)
            }
        })
        this.mem.Tags.forEach(tag => {
            if (this.tags.indexOf(tag) === -1 && this.tagsToRemove.indexOf(tag) === -1) {
                this.tagsToRemove.push(tag)
            }
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditMemoryPages');
    }

}
