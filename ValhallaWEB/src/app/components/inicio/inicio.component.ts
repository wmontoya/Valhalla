import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app-service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  public usurio: String = "Usuario";
  public listaTipoOfertas: any[] = [];
  public sinfondo: boolean = true;
  public user = "";
  public password = "";
  public selectOffer = 0;
  public loginErrores = "";
  public modal = true;

  public insigniasList: any[] = []
  public dropdownList: any[] = [{}];
  public selectedItems: any[] = [];
  public dropdownSettings: any = {};
  public imagenOferta="";

  public lat = 9.39181870417043;
  public long = -83.68323487939053;

  constructor(public service: AppService, public toastr: ToastrService) {
    this.service.obtenerTodasTiposInsignias().then((insignias) => {
      insignias.forEach(element => {
        this.insigniasList.push({ id: element.ID_TypeBadge, badge: element.Badge, estado: false })
      });
    })
    
    this.obtenerOfertas()
   
    var guardado = localStorage.getItem('preferencias');

    this.selectedItems = JSON.parse(JSON.parse(JSON.stringify(guardado)));

  }

  BufferToBase64(buffer:any) {
    var binary = '';
    var byte = new Uint8Array( buffer );
    var byteLen = byte.byteLength;
    for (var i = 0; i < byteLen; i++) {
        binary += String.fromCharCode( byte[ i ] );
    }
    return window.btoa( binary );
}

  obtenerOfertas(){
    this.listaTipoOfertas =[];
    this.service.listarTop10Ofertas().then((response) => {
      
       response.forEach(async element => {
        //  this.service.ObtenerFoto(element.ID_Offer).then((img)=>{
        //   console.log(img);
          
        //   // let TYPED_ARRAY = new Uint8Array(img);
        //   // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        //   //   return data + String.fromCharCode(byte);
        //   //   },'');
        //   // let base64String = btoa(STRING_CHAR);
        //   // this.imagenOferta = 'data:image/png;base64,'+ this.BufferToBase64(img) ;
        //  });
        let encontrado = 0;
         this.selectedItems.forEach( async preferencias=>{
           if(preferencias.itemName == element.FK_TypeOffer.TypeOffer){
            encontrado = 1;
           }
         })
         if(this.selectedItems.length == 0){
           encontrado = 1;
         }
        if(encontrado == 1){
         element.Latitude = parseFloat(element.Latitude);
         element.Longitude = parseFloat(element.Longitude);
         await this.service.obtenerCalificacionesPorId(element.ID_Offer).then((calificacion) => {
 
           let total: number = 0;
           calificacion.forEach(cali => {
             total = total + Number.parseInt(cali.Rating);
           });
           element.calificacion = Math.round(total / calificacion.length) > 0 ? Math.round(total / calificacion.length) : 0;
         }).catch((err) => {
           element.calificacion = {
             Date: "0000-00-00",
             FK_User: {
               User: "no hay"
             },
             Rating: "0"
           };
         });
         await this.service.obtenerResenasPorId(element.ID_Offer).then((resena) => {
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
 
         await this.service.obtenerInsigniasByOffer(element.ID_Offer).then((insigniasOferta) => {
           let insignias: any[] = [];
           if (this.usurio != "Usuario") {
             insigniasOferta.forEach(element => {
               if (element.FK_User.User == this.usurio) {
                 insignias.push({ Badge: element.FK_Badges.Badge, User: element.FK_User.User, FK_Offer: element.FK_Offer.ID_Offer, Id_Badge: element.FK_Badges.ID_TypeBadge })
               }
             });
           } else {
             insigniasOferta.forEach(element => {
               insignias.push({ Badge: element.FK_Badges.Badge, User: element.FK_User.User, FK_Offer: element.FK_Offer.ID_Offer, Id_Badge: element.FK_Badges.ID_TypeBadge })
             });
           }
           element.insignias = insignias;
         })
         this.service.obtenerContactosPorPersona(element.FK_User.FK_Person.ID_Person).then((contact) => {
           element.contacts = contact;
 
         })
 
         this.listaTipoOfertas.push(element);
         encontrado = 0;
        }
       });
       console.log(this.listaTipoOfertas);
       
     })
 
  }

  ngOnInit(): void {
    this.dropdownList = [];
    this.cargarPreferencias();
    this.dropdownSettings = {
      singleSelection: false,
      text: "Seleccione sus preferencias",
      selectAllText: 'Marcar Todas',
      unSelectAllText: 'Desmarcar Todas',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      searchPlaceholderText: "Buscar"
    };

  }

  cargarPreferencias(){
    this.dropdownList = [];
    this.service.listarTodoTipoOfertas().then((response) => {
      response.forEach(element => {
        this.dropdownList.push({ id: element.ID_TypeOffer, itemName: element.TypeOffer, value: false });
      });
    })
 
  }

  onItemSelect(item: any) {
    localStorage.setItem("preferencias", JSON.stringify(this.selectedItems));
    this.obtenerOfertas();
    this.cargarPreferencias();
  }
  OnItemDeSelect(item: any) {
    localStorage.setItem("preferencias", JSON.stringify(this.selectedItems));
    this.obtenerOfertas();
    this.cargarPreferencias();
  }
  onSelectAll(items: any) {
    localStorage.setItem("preferencias", JSON.stringify(this.selectedItems));
    this.obtenerOfertas();
    this.cargarPreferencias();
  }
  onDeSelectAll(items: any) {
    localStorage.setItem("preferencias", JSON.stringify(this.selectedItems));
    this.obtenerOfertas();
    this.cargarPreferencias();
  }

  login() {
    this.service.login(this.user, this.password).then((loginresponse) => {
      localStorage.setItem("token", 'Bearer ' + loginresponse.toString())

      if (loginresponse != []) {
        localStorage.setItem("Usuario", this.user);
        this.usurio = this.user;
        new InicioComponent(this.service, this.toastr);
        this.closebutton.nativeElement.click()
        this.sinfondo = true;
      }
    }).catch((err) => {
      
      this.loginErrores = err.message;
    })
  }
  cargarInsignias(index: number) {
    this.selectOffer = index;
    this.insigniasList.forEach((ins) => {
      ins.estado = false;
    })
    if (this.usurio == "Usuario") {
      this.listaTipoOfertas[index].insignias.forEach((element: any) => {
        this.insigniasList.forEach((ins) => {
          if (ins.id == element.Id_Badge) {
            ins.estado = true;
          }
        })
      });
    } else {
      this.listaTipoOfertas[index].insignias.forEach((element: any) => {
        this.insigniasList.forEach((ins) => {
          if (ins.id == element.Id_Badge && element.User == this.usurio) {
            ins.estado = true;
          }
        })
      });
    }

  }

  cerrarModal() {
    this.loginErrores = "";
    this.user = "";
    this.password = "";
    this.sinfondo = true;
  }

  modificarInsignia(estado: boolean, id: String) {

    if (this.usurio != "Usuario") {
      if (!estado) {
        this.service.registrarNuevaInsignia(this.usurio, id, this.listaTipoOfertas[this.selectOffer].ID_Offer).then((response: any) => {
          this.listaTipoOfertas[this.selectOffer].insignias.push({ Badge: response.FK_Badges.Badge, User: response.FK_User.User, FK_Offer: response.FK_Offer.ID_Offer, Id_Badge: response.FK_Badges.ID_TypeBadge })
        })
      } else {
        this.service.eliminarInsignia(this.usurio, id, this.listaTipoOfertas[this.selectOffer].ID_Offer).then((deleteInsiginia) => {
          if (deleteInsiginia.toString() != "0") {
            this.listaTipoOfertas[this.selectOffer].insignias.pop(id);
          }else{
            this.toastr.error('No se pudo retirar la Insignia.', 'Fallo', {
              timeOut: 5000,
            });
          }
        })
      }
    } else {
      this.toastr.warning('Para poder agregar su insignia por favor Iniciar su Cuenta.', 'Revisar', {
        timeOut: 5000,
      });
    }

  }

  agregarAmigos(index: number) {
    this.selectOffer = index;
    console.log(this.listaTipoOfertas[this.selectOffer].FK_User.ID_User);
    
    this.service.AgregarAmigos(this.usurio.toString(),this.listaTipoOfertas[this.selectOffer].FK_User.ID_User).then((amigo)=>{
      if(amigo){
        this.toastr.success('Se Agrego Exitosamente.', 'Agregado', {
          timeOut: 5000,
        });
      }else{
        this.toastr.warning('No se pudo agregar.', 'Revisar', {
          timeOut: 5000,
        });
      }
    })
  }

}
