import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMemoryPage } from './add-memory';

@NgModule({
  declarations: [
    AddMemoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMemoryPage),
  ],
})
export class AddMemoryPageModule {}
