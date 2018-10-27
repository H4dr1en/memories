import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

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

    filters: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, ) {
        this.filters = navParams.get('filters');
    }

    close() {
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilterPage');
    }

    isfilterActive() {
        return this.filters.tags.length || this.filters.searchTerm.length || this.filters.marks.lower > 1 || this.filters.marks.upper < 5;
    }

    ionViewWillLeave() {
        this.filters.active = this.isfilterActive();
    }
}
