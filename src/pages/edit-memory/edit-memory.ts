import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryUpdater, Memory } from '../../app/sql.service'


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

    constructor(public navCtrl: NavController, public navParams: NavParams, public memoryUpdater: memoryUpdater) {
        this.mem = this.navParams.get('mem');
    }

    editMemory() {
        // TODO : saving
        this.memoryUpdater.updateMemory(this.mem);
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditMemoryPages');
    }

}
