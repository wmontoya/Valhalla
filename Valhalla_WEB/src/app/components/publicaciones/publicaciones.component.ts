import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../services/app-service'

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  public estado = "";
  public usurio: String = "Usuario";
  public listaTipoOfertas: any[] = [];


  constructor(public service: AppService, public toastr: ToastrService) {


  }


  cargarOffertas(){
    this.service.listarOfertasPendientes().then((offertas) => {
      offertas.forEach(element => {
        console.log(element);

        this.listaTipoOfertas.push(element);
      });

    })

  }

  ngOnInit(): void {
    if (localStorage.getItem("Usuario") != "") {
      this.usurio = localStorage.getItem("Usuario")!.toString();
    }
    this.cargarOffertas();
  }

  logout() {
    localStorage.setItem("Usuario", "");
    this.usurio = "Usuario";
  }
  modificarEstado(index:number,value:any) {
   this.service.modificarEstadoOffertas(this.listaTipoOfertas[index].ID_Offer,value.value).then((response)=>{
   if(response.toString() == "1"){
    this.toastr.success('Se Agrego Exitosamente la Calificación.', 'Agregado', {
      timeOut: 5000,
    });
   }else{
    this.toastr.warning('No se pudo agregar la Calificación.', 'Revisar', {
      timeOut: 5000,
    });
   }
   });
  }

}
