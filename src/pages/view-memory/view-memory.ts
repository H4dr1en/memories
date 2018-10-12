import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { EditMemoryPage } from '../edit-memory/edit-memory';
import { memoryProvider } from '../../app/sql.service';


/**
 * Generated class for the ViewMemoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-view-memory',
    templateUrl: 'view-memory.html',
})
export class ViewMemoryPage {

    mem: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public memoryProvider: memoryProvider) {
        this.mem = navParams.get("mem");
    }

    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Memory',
            buttons: [
                {
                    text: 'Modify',
                    icon: "md-create",
                    handler: () => {
                        this.showEditMemoryPage();
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: "ios-trash",
                    handler: () => {
                        this.showDeleteAlert();
                    }
                },  
                {
                    text: 'Cancel',
                    icon: "close",
                    role: 'cancel',
                    handler: () => { }
                }
            ]
        });
        actionSheet.present();
    }

    showDeleteAlert() {
        const alert = this.alertCtrl.create({
            title: 'Confirm suppression',
            message: 'Are you sure to delete this memory?',
            buttons: [
                {
                    text: 'No',
                    handler: () => { }
                },
                {
                    text: 'Yes',
                    handler: () => this.deleteMemory()
                }
            ]
        });
        alert.present();
    }

    deleteMemory() {
        this.memoryProvider.deleteMemory(this.mem);
        this.navCtrl.pop();
    }

    showEditMemoryPage() {
        const modal = this.navCtrl.push(EditMemoryPage, { mem: this.mem });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ViewMemoryPage');
    }

}
