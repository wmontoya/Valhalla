import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app-service'
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public usurio: String = "Usuario";
  public listaTipoOfertas: any[] = [];
  public user="";
  public password="";



  lat = 9.39181870417043;
  long = -83.68323487939053;

  constructor(public service: AppService) {

    service.listarTop10Ofertas().then((response) => {
      response.forEach(element => {
        element.Latitude = parseFloat(element.Latitude);
        element.Longitude = parseFloat(element.Longitude);
        service.obtenerCalificacionesPorId(element.ID_Offer).then((calificacion) => {
          element.calificacion = calificacion;
        }).catch((err) => {
          element.calificacion = {
            Date: "0000-00-00",
            FK_User: {
              User: "no hay"
            },
            Rating: "0"
          };
        });
        service.obtenerResenasPorId(element.ID_Offer).then((resena) => {
          if (resena != null) {
            element.resena = resena;
          }
        }).catch((err) => {
          element.resena = {
            Date: "0000-00-00",
            FK_User: {
              User: "no hay"
            },
            Review: "sin calificar"
          };
        });

        service.obtenerContactosPorPersona(element.FK_User.FK_Person.ID_Person).then((contact) => {
          element.contacts = contact;

        })

        this.listaTipoOfertas.push(element);
      });
      console.log(this.listaTipoOfertas);

    })

  }

  ngOnInit(): void {

  }

  login() {
   this.service.login(this.user, this.password).then((loginresponse)=>{
  if(loginresponse != []){
this.usurio = this.user;
  }
   })
  }


}
