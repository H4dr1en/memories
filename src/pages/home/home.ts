import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LimitTo } from '../../app/limitTo.pipe';
import { ViewMemoryPage } from '../view-memory/view-memory'; 

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    memories: any[] = [
        {
            img: "nin-live.png",
            title: "This is a cool title about a very long story that may take several lines to write",
            content: "Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!"
        }, 
        {
            img: "nin-live.png",
            title: "This is a cool title about a very long story that may take several lines to write",
            content: "Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy! Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!Here are some nice content about the nice title! Like, share, enjoy!"
        }
    ];
    pushPage: any = ViewMemoryPage;

    constructor(public navCtrl: NavController) {
    }

    
    pushMemory(mem) {
        this.navCtrl.push(ViewMemoryPage, { 'mem': mem });
    }
    

} 
