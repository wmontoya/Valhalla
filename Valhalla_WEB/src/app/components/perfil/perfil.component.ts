import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usurio: string = "Usuario";
  public datosUsuario= {
    Direction: "",
    ID_Person: "",
    IdentificationID: "",
    Lastname1: "",
    Lastname2: "",
    Name: "",
    ID_Rol: "",
    Rol:"",
    ID_User: "",
    User: "",
    EndYear: "",
    ID_Title: "",
    StartYear: "",
    TitleInstitution: "",
    TitleName: "",
    Correo:"",
    Telefono:""
  }
  public datosOferta={
    NombreServicio:"",
    Precio:"",
    Longitud:"",
    Latitud:"",
    Descripcion:"",
    TypoOferta:"",
    Imagen:""
  }

  public myOffers:any[]=[{}];
  public dropdownList: any[] = [{}];
  public selectedItems: any[] = [];
  public dropdownSettings: any = {};
  public nuevaTipoOferta : boolean = false;
  public listaAmigos :any[]=[{}]
  constructor(public service: AppService) { }

  cargarDatosUsario() {
    this.myOffers = [];
    this.listaAmigos =[];
    this.service.obtenerUsuario(this.usurio).then((userData) => {
      this.service.obtenerTitles(userData[0].FK_Person.ID_Person).then((titleData) => {
        this.datosUsuario.TitleName = titleData[0].TitleName;
        this.datosUsuario.TitleInstitution = titleData[0].TitleInstitution;
        this.datosUsuario.StartYear = titleData[0].StartYear;
        this.datosUsuario.EndYear = titleData[0].EndYear;
        this.datosUsuario.ID_Title = titleData[0].ID_Title;
      });
      this.service.obtenerContactosPorPersona(userData[0].FK_Person.ID_Person).then((contacData) => {
        contacData.forEach(element => {
          if(element.TypeContact  == "Correo"){
            this.datosUsuario.Correo = element.Contact
          }
          if(element.TypeContact  == "Celular"){
            this.datosUsuario.Telefono = element.Contact
          }
        });
      });
      this.datosUsuario.Direction =userData[0].FK_Person.Direction;
      this.datosUsuario.ID_Person=userData[0].FK_Person.ID_Person;
      this.datosUsuario.IdentificationID=userData[0].FK_Person.IdentificationID;
      this.datosUsuario.Lastname1=userData[0].FK_Person.Lastname1;
      this.datosUsuario.Lastname2=userData[0].FK_Person.Lastname2;
      this.datosUsuario.Name=userData[0].FK_Person.Name;
      this.datosUsuario.ID_Rol=userData[0].FK_Rol.ID_Rol;
      this.datosUsuario.Rol=userData[0].FK_Rol.Rol;
      this.datosUsuario.ID_User=userData[0].ID_User;
      this.datosUsuario.User=userData[0].User;
      this.service.ListarAmigos(this.datosUsuario.ID_User).then((amigos)=>{

        amigos.forEach(element => {
          console.log(element);
          
          let tempAmigos = {idPersona:"",nombre:"", tel:"",corr:"",tit:""};
          tempAmigos.nombre =element.FK_UserFriend.FK_Person.Name+" "+element.FK_UserFriend.FK_Person.Lastname1+" "+element.FK_UserFriend.FK_Person.Lastname2;
          tempAmigos.idPersona=element.FK_UserFriend.FK_Person.ID_Person; 
        
          this.service.obtenerTitles(element.FK_UserFriend.FK_Person.ID_Person).then((titulo)=>{
            tempAmigos.tit= titulo[0].TitleName == undefined ? "No tiene": titulo[0].TitleName;
          });
          this.service.obtenerContactosPorPersona(element.FK_UserFriend.FK_Person.ID_Person).then((contacData) => {
            contacData.forEach(element => {
              if(element.TypeContact  == "Correo"){
                tempAmigos.corr = element.Contact
              }
              if(element.TypeContact  == "Celular"){
                tempAmigos.tel = element.Contact
              }
            });
          });
          this.listaAmigos.push(tempAmigos);
        });
      })
     this.service.obtenerOfertasPorUsuario(this.datosUsuario.ID_User).then((offerData)=>{
      offerData.forEach(element => {
         this.myOffers.push({
           Date:element.Date,
           TypeOffer:element.FK_TypeOffer.TypeOffer,
           ID_Offer:element.ID_Offer,
           Price:element.Price,
           ServiceName:element.ServiceName,
           ServiceDescription:element.ServiceDescription,
           State:element.State
          });
       });
      
        
     })
     
      
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem("Usuario")!= ""){
      this.usurio = localStorage.getItem("Usuario")!.toString();
    }
    this.usurio = localStorage.getItem("Usuario")!;
    this.cargarDatosUsario();

    
    this.cargarTipoOfertas();
    this.dropdownSettings = {
      singleSelection: true,
      text: "Seleccione sus preferencias",
      selectAllText: 'Marcar Todas',
      unSelectAllText: 'Desmarcar Todas',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      searchPlaceholderText: "Buscar",
    };

  }
  logout(){
    localStorage.setItem("Usuario", "");
    this.usurio = "Usuario";
  }
  cargarTipoOfertas(){
    this.dropdownList = [];
    this.service.listarTodoTipoOfertas().then((response) => {
      response.forEach(element => {
        this.dropdownList.push({ id: element.ID_TypeOffer, itemName: element.TypeOffer, value: false });
      });
      this.dropdownList.push({ id: '', itemName: "Nuevo", value: false });
    })
 
  }
onItemSelect(item: any) {
    this.cargarTipoOfertas();
    this.datosOferta.TypoOferta = item.id;
   if(item.itemName == "Nuevo"){
     this.nuevaTipoOferta = true;
   }
  }
  OnItemDeSelect(item: any) {
    this.cargarTipoOfertas();
    this.nuevaTipoOferta = false;
  }
  onSelectAll(items: any) {
    this.cargarTipoOfertas();
    this.nuevaTipoOferta = false;
  }
  onDeSelectAll(items: any) {
    this.cargarTipoOfertas();
    this.nuevaTipoOferta = false;
  }

  nuevaOferta(){
    this.service.AgregarOfertas(
      this.datosOferta.NombreServicio,
      this.datosOferta.Precio,
      this.datosOferta.Longitud,
      this.datosOferta.Latitud,
      this.datosOferta.Descripcion,
      this.datosOferta.TypoOferta,
      this.datosOferta.Imagen,
      this.datosUsuario.ID_User
    ).then((newOffer:any)=>{
      console.log(newOffer.Date);
      
      this.myOffers.push({
        Date:newOffer.Date,
        TypeOffer:newOffer.FK_TypeOffer.TypeOffer,
        ID_Offer:newOffer.ID_Offer,
        Price:newOffer.Price,
        ServiceName:newOffer.ServiceName,
        ServiceDescription:newOffer.ServiceDescription,
        State:newOffer.State
       });
      
    })
  }

  changeListener($event:any) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.datosOferta.Imagen = myReader.result!.toString();
      console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

}
