import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

    mem: any

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.mem = {};
        this.mem.title = "Last day in San Francisco"
        this.mem.description = "Johnny is so excited, while I'm really tired.";
    }

    addMemory() {
        // TODO : implement

        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemoryPage');
    }

}
