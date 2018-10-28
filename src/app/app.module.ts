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
import { HTTP } from '@ionic-native/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera'

// Modules
import { MyApp } from './app.component';
import { memoryProvider } from './memory.provider';
import { IonTagsInputModule } from "ionic-tags-input";

// Pages
import { HomePage } from '../pages/home/home';
import { ViewMemoryPage } from '../pages/view-memory/view-memory';
import { AddMemoryPage } from '../pages/add-memory/add-memory';
import { EditMemoryPage } from '../pages/edit-memory/edit-memory';
import { FilterPage } from '../pages/filter/filter';
import { MapPage } from '../pages/map/map';

// Services
import { DataBaseService } from './services/sql.service'
import { GeoLocService } from './services/geolocation.service';
import { CameraService } from './services/camera.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { LimitTo } from './pipes/limitTo.pipe';
import { MarkPipe } from './pipes/mark.pipe'
import { BookmarkPipe } from './pipes/bookmark.pipe'
import { coordinatesPipe } from './pipes/coordinates.pipe'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewMemoryPage,
    AddMemoryPage,
    EditMemoryPage,
    FilterPage,
    MapPage,
    LimitTo,
    FilterPipe,
    SortPipe,
    MarkPipe,
    BookmarkPipe,
    coordinatesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonTagsInputModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewMemoryPage,
    AddMemoryPage,
    EditMemoryPage,
    FilterPage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    memoryProvider,
    DataBaseService,
    GeoLocService,
    Geolocation,
    CameraService,
    SQLite,
    HTTP,
    GoogleMaps,
    SocialSharing,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
