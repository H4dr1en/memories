import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LimitTo } from './limitTo.pipe';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ViewMemoryPage } from '../pages/view-memory/view-memory';
import { PopOverEditMemoryPage } from '../pages/pop-over-edit-memory/pop-over-edit-memory';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewMemoryPage,
    PopOverEditMemoryPage,
    LimitTo
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewMemoryPage,
    PopOverEditMemoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
