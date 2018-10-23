// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Ionic Modules
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';

// Modules
import { MyApp } from './app.component';
import { memoryProvider } from './memory.provider';
import {IonTagsInputModule} from "ionic-tags-input";

// Pages
import { HomePage } from '../pages/home/home';
import { ViewMemoryPage } from '../pages/view-memory/view-memory';
import { AddMemoryPage } from '../pages/add-memory/add-memory';
import { EditMemoryPage } from '../pages/edit-memory/edit-memory';
import { FilterPage } from '../pages/filter/filter';

// Services
import { DataBaseService } from './services/sql.service'
import { GeoLocService } from './services/geolocation.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { LimitTo } from './pipes/limitTo.pipe';


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
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonTagsInputModule
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
    GeoLocService,
    Geolocation,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
