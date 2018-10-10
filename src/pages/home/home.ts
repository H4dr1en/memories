import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LimitTo } from '../../app/limitTo.pipe';
import { ViewMemoryPage } from '../view-memory/view-memory';
import { AddMemoryPage } from '../add-memory/add-memory';
import { memoryUpdater, Memory } from '../../app/sql.service';
import { FilterPage } from '../filter/filter';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    
    searchQuery: string = '';

    constructor(public navCtrl: NavController, protected memoryUpdater: memoryUpdater, protected modalCtrl: ModalController) { }

    get memories (): Memory[] {
        return this.memoryUpdater.memories;
    }

    presentModal() {
        const modal = this.modalCtrl.create(FilterPage);
        modal.present();
    }

    pushMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }

    showAddMemoryPage() {
        this.navCtrl.push(AddMemoryPage);
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter HomePage');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

} 
