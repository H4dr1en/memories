import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryProvider, Memory } from '../../app/sql.service'

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

    constructor(public navCtrl: NavController, public navParams: NavParams,  public memoryProvider: memoryProvider) {
        this.mem = {
            rowid : undefined,
            Title : "Last day in San Francisco",
            Description : "Johnny is so excited, while I'm really tired.",
            Location : "San Francisco",
            Mark: undefined,
            Tags: undefined,
            Date: undefined
        }              
    }

    addMemory() {
        this.mem.Date = new Date();
        this.memoryProvider.createNewMemory(this.mem);
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddMemoryPage');
    }

}
