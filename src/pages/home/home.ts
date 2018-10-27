import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewMemoryPage } from '../view-memory/view-memory';
import { AddMemoryPage } from '../add-memory/add-memory';
import { FilterPage } from '../filter/filter';
import { memoryProvider, Memory } from '../../app/memory.provider';
import { MapPage } from '../map/map';
import { SocialSharing } from '@ionic-native/social-sharing';

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
            lower: 1,
            upper: 5
        },
        onlyBookmark: false,
        active: false
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public memoryProvider: memoryProvider, private socialSharing: SocialSharing) {
    }

    showMap() {
        this.navCtrl.push(MapPage, { 'memories': this.memoryProvider.memories });
    }

    handleClick(event: Event, mem: Memory): void {
        console.log(event.target) 
        let elementClass: string = (event.target as Element).className;       
        if (elementClass.includes("button-inner")) {
            this.shareMemory(mem);
        }
        else if (!elementClass.includes("heart")) {
            this.pushMemory(mem);
        }
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(FilterPage, { filters: this.filters });
        popover.present({ ev: event });
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

    shareMemory(mem: Memory) {

        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
            message: mem.Description, // not supported on some apps (Facebook, Instagram)
            subject: mem.Title, // fi. for email
            files: ['', ''], // an array of filenames either locally or remotely
            url: 'https://www.website.com/foo/#bar?a=b',
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title,
        };

        // Share via email
        this.socialSharing.shareWithOptions(options);
    }
} 
