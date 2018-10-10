import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html',
})
export class FilterPage {

    sortField: string = '';

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, ) {
    }

    dismiss() {
        let filters = {
            sortField: this.sortField
        };
        this.viewCtrl.dismiss(filters);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilterPage');
    }

}
