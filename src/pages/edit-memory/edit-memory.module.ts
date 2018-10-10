import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMemoryPage } from './edit-memory';

@NgModule({
  declarations: [
    EditMemoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMemoryPage),
  ],
})
export class EditMemoryPageModule {}
