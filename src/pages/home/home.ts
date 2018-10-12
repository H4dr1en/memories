import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { LimitTo } from '../../app/limitTo.pipe';
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

    searchTerm: string = '';
    displayedMemories: Memory[];
    
    filters: any = { sortField: '' };
    filterOrder: FilterOrder = FilterOrder.Asc;
    filterActive: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, protected memoryProvider: memoryProvider, protected modalCtrl: ModalController) {
        this.displayedMemories = this.memoryProvider.memories;
    }

    get memories(): Memory[] {
        return this.memoryProvider.memories;
    }

    presentFilter() {
        const modal = this.modalCtrl.create(FilterPage);
        modal.present();
        modal.onDidDismiss(filters => {
            this.filters = filters;
            this.setFilteredItems();
        })
    }

    pushMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }

    showAddMemoryPage() {
        this.navCtrl.push(AddMemoryPage);
    }

    setFilteredItems() {
        
        this.filterActive = this.filters.sortField.length > 0 ? true : false;

        if (this.filters.sortField == "Title") {
            if (this.filterOrder == FilterOrder.Asc) {
                this.displayedMemories = this.memoryProvider.memories.sort((a, b) => {
                    if (a.Title < b.Title) return -1;
                    if (a.Title > b.Title) return 1;
                    return 0;
                })
            } else {
                this.displayedMemories = this.memoryProvider.memories.sort((a, b) => {
                    if (a.Title < b.Title) return 1;
                    if (a.Title > b.Title) return -1;
                    return 0;
                })
            }
        }
        else if (this.filters.sortField == "Date") {
            if (this.filterOrder == FilterOrder.Asc) {
                this.displayedMemories = this.memoryProvider.memories.sort((a, b) => b.Date.getTime() - a.Date.getTime());
            } else {
                this.displayedMemories = this.memoryProvider.memories.sort((a, b) => a.Date.getTime() - b.Date.getTime());
            }
        }

        this.displayedMemories = this.memoryProvider.filterItems(this.searchTerm);
    }

    swapfilterOrder() {
        this.filterOrder = this.filterOrder == FilterOrder.Asc ? FilterOrder.Desc : FilterOrder.Asc;
        this.setFilteredItems();
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter HomePage');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

} 
