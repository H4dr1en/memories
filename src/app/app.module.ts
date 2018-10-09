import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LimitTo } from './limitTo.pipe';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {memorieUpdater, DataBaseService } from './sql.service'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ViewMemoryPage } from '../pages/view-memory/view-memory';
import { AddMemoryPage } from '../pages/add-memory/add-memory';
import { EditMemoryPage } from '../pages/edit-memory/edit-memory';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewMemoryPage,
    AddMemoryPage,
    EditMemoryPage,
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
    AddMemoryPage,
    EditMemoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    memorieUpdater,
    DataBaseService,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
