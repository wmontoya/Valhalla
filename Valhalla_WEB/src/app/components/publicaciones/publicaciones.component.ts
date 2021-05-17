import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-service'

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  public fechaInicio:any;
  public fechaFinal:any;
  public usurio: String = "Usuario";
  public listaTipoOfertas: any[] = [];


  constructor(service: AppService) {

    service.listarTodoTipoOfertas().then((response) => {
      response.forEach(element => {
        this.listaTipoOfertas.push({ id: element.ID_TypeOffer, typeoffer: element.TypeOffer, value: false });
      });
    })
  }

  ngOnInit(): void {

  }

  ModificarMemoria(index: number) {
    this.listaTipoOfertas[index].value = !this.listaTipoOfertas[index].value;
  }

}
