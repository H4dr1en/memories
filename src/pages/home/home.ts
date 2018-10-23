import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewMemoryPage } from '../view-memory/view-memory';
import { AddMemoryPage } from '../add-memory/add-memory';
import { memoryProvider, Memory } from '../../app/memory.provider';
import { FilterPage } from '../filter/filter';

export enum FilterOrder {
    Asc = "Asc",
    Desc = "Desc"
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    filters: any = {
        searchTerm: '',
        tags: [],
        sort: {
            field: '',
            order: FilterOrder.Asc
        }
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, protected memoryProvider: memoryProvider, public popoverCtrl: PopoverController) {
    }

    presentPopover() {
        let popover = this.popoverCtrl.create(FilterPage, {filters: this.filters});
        popover.present();
        popover.onDidDismiss(({ sort, tags }) => {
            this.filters.tags = tags;
            this.filters.sort.field = sort.field;
        })
    }

    pushMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }

    showAddMemoryPage() {
        this.navCtrl.push(AddMemoryPage);
    }

    swapfilterOrder() {
        this.filters.sort.order = this.filters.sort.order == FilterOrder.Asc ? FilterOrder.Desc : FilterOrder.Asc;
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter HomePage');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

} 
