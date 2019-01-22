import { Component } from '@angular/core';
import { PedidoPage } from '../pedido/pedido';
import { ClientePage } from '../cliente/cliente';
import { ArticuloPage } from '../articulo/articulo';
import { RubroPage } from '../rubro/rubro';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PedidoPage;
  tab2Root = ClientePage;
  tab3Root = ArticuloPage;
  tab4Root = RubroPage;

  constructor() {

  }
}
