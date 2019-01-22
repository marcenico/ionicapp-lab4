import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticuloPage } from './articulo';

@NgModule({
  declarations: [
    ArticuloPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticuloPage),
  ],
})
export class ArticuloPageModule {}
