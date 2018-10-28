import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryProvider, Memory } from '../../app/memory.provider'
import { GeoLocService, location } from '../../app/services/geolocation.service'
import { ILatLng } from '@ionic-native/google-maps';
import { CameraService } from '../../app/services/camera.service'


@IonicPage()
@Component({
    selector: 'page-add-memory',
    templateUrl: 'add-memory.html',
})
export class AddMemoryPage {

    mem: Memory;

    constructor(public navCtrl: NavController, public navParams: NavParams, public memoryProvider: memoryProvider,
        public geoloc: GeoLocService, public camera: CameraService,) {

        this.mem = {
            rowid: undefined,
            Title: "",
            Description: "",
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

    takePicture() {
        this.camera.takePicture().then((imageData) => {
            this.mem.Img = "data:image/jpeg;base64," + imageData;
        });
    }

    removePicture() {
        this.mem.Img = "";
    }

    importPicture() {
        this.camera.importPicture().then((imageData) => {
            this.mem.Img = "data:image/jpeg;base64," + imageData;
        });
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
