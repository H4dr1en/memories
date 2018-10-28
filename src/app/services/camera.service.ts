import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';


@Injectable()
export class CameraService {
    constructor(private camera: Camera) { }

    takePicture() {
        let options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000,
            saveToPhotoAlbum: true
        };
        return this.camera.getPicture(options);
    }

    importPicture() {
        let options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: this.camera.MediaType.PICTURE
        };
        return this.camera.getPicture(options).catch(e => {
            console.error(e);
        })
    }

}