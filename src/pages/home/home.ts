import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { ViewMemoryPage } from '../view-memory/view-memory';
import { AddMemoryPage } from '../add-memory/add-memory';
import { memoryProvider, Memory } from '../../app/sql.service';
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
        sortField: '',
        searchTerm: ''
    };
    filterOrder: FilterOrder = FilterOrder.Asc;
    filterActive: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, protected memoryProvider: memoryProvider, protected modalCtrl: ModalController) {
    }

    presentFilter() {
        const modal = this.modalCtrl.create(FilterPage);
        modal.present();
        modal.onDidDismiss(filters => {
            this.filters = filters;
        })
    }

    pushMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }

    showAddMemoryPage() {
        this.navCtrl.push(AddMemoryPage);
    }

    swapfilterOrder() {
        this.filterOrder = this.filterOrder == FilterOrder.Asc ? FilterOrder.Desc : FilterOrder.Asc;
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter HomePage');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

} 
