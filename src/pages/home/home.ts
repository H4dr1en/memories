import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewMemoryPage } from '../view-memory/view-memory';
import { AddMemoryPage } from '../add-memory/add-memory';
import { FilterPage } from '../filter/filter';
import { memoryProvider } from '../../app/memory.provider';

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
        },
        marks: {
            lower: 0,
            upper: 5
        }
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public memoryProvider: memoryProvider) {
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(FilterPage, {filters: this.filters});
        popover.present({ev:event});
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
        console.log('ionViewWillEnter HomePage', this.memoryProvider.memories);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

} 
