import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    ILatLng,
    LatLng,
    Marker,
    MarkerOptions,
    BaseArrayClass
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;

    map: GoogleMap;

    constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter MarkerPage');

        this.plt.ready().then(() => {
            console.log("init map")
            this.initMap();
        });
    }

    initMap() {

        let bounds: ILatLng[] = [{ lat: 41.79883, lng: 140.75675 }, { lat: 41.799240000000005, lng: 140.75875000000002 }, { lat: 41.797650000000004, lng: 140.75905 }]

        let el = this.mapElement.nativeElement;
        this.map = GoogleMaps.create(el, {
            camera: {
                target: bounds
            }
        });

        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
            this.map.setCameraZoom(this.map.getCameraZoom() - 1)

            bounds.forEach(coords => {

                let markerOptions: MarkerOptions = {
                    position: coords,
                    title: 'Our first POI'
                };

                this.map.addMarker(markerOptions)
                    .then((marker: Marker) => {
                        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
                        marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
                        marker.showInfoWindow();
                    });

            })
        })
    }

    onMarkerClick(params: any) {
        let marker: Marker = <Marker>params[1];
        let title: any = marker.get('title');
        console.log(title)
    }

}
