import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LimitTo } from '../../app/limitTo.pipe';
import { ViewMemoryPage } from '../view-memory/view-memory';
import { AddMemoryPage } from '../add-memory/add-memory';
import { memoryUpdater } from '../../app/sql.service';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    memories: any[];/* = [ 
        {
            img: "nin-live.png",
            title: "This is a cool title about a veeeery long story that may take several lines to write",
            description: "Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!"
        }, 
        {
            img: "nin-live.png",
            title: "This is a cool title about a veeeery long story that may take several lines to write",
            description: "Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!"
        }
    ];*/
    searchQuery: string = '';
    memoryUpdater: memoryUpdater;

    constructor(public navCtrl: NavController, memoryUpdater: memoryUpdater) {
        this.memoryUpdater = memoryUpdater;
    }

    getSearchedItems(event: any) {

        // set val to the value of the searchbar
        const val = event.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.memories = this.memories.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }

    }

    pushMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }

    showAddMemoryPage() {
        this.navCtrl.push(AddMemoryPage);
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter HomePage');
        this.refreshMemories();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    refreshMemories() {
        //this.memoryUpdater.memories;
    }

    trackByFn(index, item) {
        return index;
    }

} 
