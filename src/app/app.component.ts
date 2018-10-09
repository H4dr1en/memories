import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { memorieUpdater, DataBaseService } from './sql.service'

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, DBS: DataBaseService, memorieUpdater: memorieUpdater) {
    platform.ready().then(() => {
      DBS.initiateDB();
      memorieUpdater.createNewMemorie("this is a test", "This a description for my test");
      console.log(memorieUpdater.memories);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

