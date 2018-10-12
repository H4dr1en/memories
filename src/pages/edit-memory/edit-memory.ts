import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { memoryProvider, Memory } from '../../app/sql.service'


/**
 * Generated class for the EditMemoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-memory',
    templateUrl: 'edit-memory.html',
})
export class EditMemoryPage {

    mem: Memory
    tags: any[] = []
    tagsToRemove: any[] = []
    tagsToAdd: any[] = []

    constructor(public navCtrl: NavController, public navParams: NavParams, public memoryProvider: memoryProvider) {
        this.mem = this.navParams.get('mem');
        this.tags = this.mem.Tags
    }

    editMemory() {
        this.memoryProvider.updateMemory(this.mem,this.tagsToAdd,this.tagsToRemove);
        this.navCtrl.pop();
    }

    onTagChange() {
        this.tags.forEach(tag =>{
            if(this.mem.Tags.indexOf(tag) === -1 && this.tagsToAdd.indexOf(tag) === -1){
                this.tagsToAdd.push(tag)
            }
        })
        this.mem.Tags.forEach(tag =>{
            if(this.tags.indexOf(tag) === -1 && this.tagsToRemove.indexOf(tag) === -1){
                this.tagsToRemove.push(tag)
            }
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditMemoryPages');
    }

}
