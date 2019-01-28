import { Component } from '@angular/core';
import { ClientePage } from '../cliente/cliente';
import { ArticuloPage } from '../articulo/articulo';
import { RubroPage } from '../rubro/rubro';
import { HomePage } from '../home/home';
import { PedidosPage } from '../pedidos/pedidos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientePage;
  tab3Root = ArticuloPage;
  tab4Root = RubroPage;
  tab5Root = PedidosPage;

  constructor() {

  }
}
