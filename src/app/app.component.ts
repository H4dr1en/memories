import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { memoryUpdater } from './sql.service'

import { HomePage } from '../pages/home/home';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
    memoryUpdater: memoryUpdater;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, memoryUpdater: memoryUpdater) {

        this.memoryUpdater = memoryUpdater;

        platform.ready().then(() => {

            console.log("Platform ready");

            this.memoryUpdater.createNewMemory("this is a test", "This a description for my test").then(() => {
                console.log("createdNewMemory");

                /*
                this.memoryUpdater.getMemories().then((mems) => {
                    console.log("gotMemories");
    
                    console.log("mems", mems);
                });
                */
                console.log("mems", this.memoryUpdater.memories);
            });

            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

