import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
        this.mem = navParams.get("mem");
    }

    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Memory',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        this.showDeleteAlert();
                    }
                }, {
                    text: 'Modify',
                    handler: () => {
                        console.log('Archive clicked');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
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
        // To implement
        console.log("deleting ", this.mem);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ViewMemoryPage');
    }

}
