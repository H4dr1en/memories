import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LimitTo } from './pipes/limitTo.pipe';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { memoryProvider, DataBaseService } from './sql.service'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ViewMemoryPage } from '../pages/view-memory/view-memory';
import { AddMemoryPage } from '../pages/add-memory/add-memory';
import { EditMemoryPage } from '../pages/edit-memory/edit-memory';
import { FilterPage } from '../pages/filter/filter';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewMemoryPage,
    AddMemoryPage,
    EditMemoryPage,
    FilterPage,
    LimitTo,
    FilterPipe,
    SortPipe
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
    EditMemoryPage,
    FilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    memoryProvider,
    DataBaseService,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
