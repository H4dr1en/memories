import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    ILatLng,
    Marker,
    MarkerOptions
} from '@ionic-native/google-maps';
import { Memory } from '../../app/memory.provider';
import { ViewMemoryPage } from '../view-memory/view-memory';


@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;

    map: GoogleMap;
    memories: Memory[];

    constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
        this.memories = navParams.get("memories");
    }

    ionViewWillEnter() {
        console.log('ionViewDidEnter MapPage');

        this.plt.ready().then(() => {
            this.initMap();
        });
    }

    initMap() {

        let bounds: ILatLng[] = this.memories.map<ILatLng>((mem: Memory) => mem.Location.coords);

        let el = this.mapElement.nativeElement;
        this.map = GoogleMaps.create(el, {
            camera: {
                target: bounds
            }
        });

        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
            this.map.setCameraZoom(this.map.getCameraZoom() - 1)

            this.memories.forEach(mem => {

                let markerOptions: MarkerOptions = {
                    position: mem.Location.coords,
                    title: mem.Title,
                    mem: mem
                };

                this.map.addMarker(markerOptions)
                    .then((marker: Marker) => {
                        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick.bind(this));
                        marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick.bind(this));
                        marker.showInfoWindow();
                    });

            })
        })
    }

    showMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }

    onMarkerClick(params: any) {
        let marker: Marker = <Marker>params[1];
        let mem: Memory = marker.get('mem');
        this.showMemory(mem);
    }
}
