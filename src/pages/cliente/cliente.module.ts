import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientePage } from './cliente';

@NgModule({
  declarations: [
    ClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientePage),
  ],
})
export class ClientePageModule {}
