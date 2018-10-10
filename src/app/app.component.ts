import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { memoryUpdater, Memory } from './sql.service'

import { HomePage } from '../pages/home/home';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
    memoryUpdater: memoryUpdater;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {            
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

