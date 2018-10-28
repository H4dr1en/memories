import { Injectable } from '@angular/core';
import {Camera} from '@ionic-native/camera';


@Injectable()
export class CameraService {
    constructor(private camera: Camera){}

    takePicture(){
         return this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).catch(e => {
            console.error(e);
        })
    }

}