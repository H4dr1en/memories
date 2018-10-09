import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

    mem: any

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.mem = this.navParams.get('mem');
        console.log("tes", this.mem)
    }

    editMemory() {
        // TODO : saving
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditMemoryPages');
    }

}
