import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';




const url = 'http://localhost:3000/valhalla_api/';

@Injectable()
export class AppService {

  constructor(private apollo: Apollo) { }

  login(user: string, pass: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
        mutation($user:String!,$password:String!){
          Login(user:$user, password:$password){
            accessToken
          }
        }
        `,
          variables: {
            user: user,
            password: pass
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).Login.accessToken);
        }, (error) => {
          return reject(error);
        });
    });
  }

  listarTodoTipoOfertas() {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
      query{
        typeoffers{
          ID_TypeOffer
          TypeOffer
        }
      }
      `
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).typeoffers);
        }, (error) => {
          return reject(error);
        });
    })

  }

  listarTop10Ofertas() {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query{
        offerstop10{
          ID_Offer
           ServiceName
           ServiceDescription
           Price
           Date
           Latitude
           Longitude
           FK_User{
            ID_User
            FK_Person{
              ID_Person
              IdentificationID
              Name
              Lastname1
              Lastname2
            }
           }
           FK_TypeOffer{
             TypeOffer
           }
           State
           
         }
       }
       `
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).offerstop10);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerResenasPorId(fk_offer: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
       mutation($fk_offer:String!){
        ReviewById(fk_offer:$fk_offer){
          Date
          Review
           FK_User{
             User
           }
         }
       }
       `, variables: {
            fk_offer: fk_offer
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).ReviewById);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerCalificacionesPorId(fk_offer: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($fk_offer:String!){
        RatingbyIdOffer(fk_offer:$fk_offer){
          ID_Rating
          Rating
          Date
          FK_User{
            User
          }
        }
      }
       `, variables: {
            fk_offer: fk_offer
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).RatingbyIdOffer);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerContactosPorPersona(fk_persona: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
       mutation($fk_persona:String!){
        contactsByPerson(fk_persona:$fk_persona){
          Contact
          TypeContact
         }
       }
       `, variables: {
            fk_persona: fk_persona
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).contactsByPerson);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerTodasTiposInsignias() {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query{
        allTypeBadgues{
          ID_TypeBadge
          Badge
        }
      }
       `
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).allTypeBadgues);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerInsigniasByOffer(id_offer: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
       mutation($id_offer:String!){
        BadguesbyIdOffer(id_offer:$id_offer){
          ID_Badge
          FK_Badges{
            ID_TypeBadge
            Badge
          }
          FK_Offer{
            ID_Offer
          }
          FK_User{
            User
          }
        }
       }
       `, variables: {
            id_offer: id_offer
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).BadguesbyIdOffer);
        }, (error) => {
          return reject(error);
        });
    })
  }

  registrarNuevaInsignia(id_user: String, id_typeBadges: String, id_offer: String) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
       mutation($id_user:String!,$id_typeBadges:String!,$id_offer:String!){
          RegisterBadges(id_user:$id_user,id_typeBadges:$id_typeBadges,id_offer:$id_offer){
            ID_Badge
          FK_Badges{
            ID_TypeBadge
            Badge
          }
          FK_Offer{
            ID_Offer
          }
          FK_User{
            User
          }
          }
        }
       `, variables: {
            id_offer: id_offer,
            id_typeBadges: id_typeBadges,
            id_user: id_user
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).RegisterBadges);
        }, (error) => {
          return reject(error);
        });
    })
  }

  eliminarInsignia(id_user: String, id_typeBadges: String, id_offer: String) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
          mutation($id_user:String!,$id_typeBadges:String!,$id_offer:String!){
            DeleteBadges(id_user:$id_user,id_typeBadges:$id_typeBadges,id_offer:$id_offer)
          }
       `, variables: {
            id_offer: id_offer,
            id_typeBadges: id_typeBadges,
            id_user: id_user
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).DeleteBadges);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerUsuario(user: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($user:String!){
          UsuarioByUser(user:$user){
            ID_User
            User
            FK_Person{
              ID_Person
              IdentificationID
              Name
              Lastname1
              Lastname2
              Direction
            }
            FK_Rol{
              ID_Rol
              Rol
            }
            
          }
       }
       `, variables: {
            user: user
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).UsuarioByUser);
        }, (error) => {
          return reject(error);
        });
    })
  }

  obtenerTitles(Id_Person: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($Id_Person:String!){
        ObtenerTitulos(id_person:$Id_Person){
          ID_Title
          TitleName
          TitleInstitution
          StartYear
          EndYear
        }
       }
       `, variables: {
        Id_Person: Id_Person
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).ObtenerTitulos);
        }, (error) => {
          return reject(error);
        });
    })
  }


  obtenerOfertasPorUsuario(Id_User: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($Id_User:String!){
          offersByUser(Id_user:$Id_User){
            ID_Offer
            ServiceName
            ServiceDescription
            Price
            Date
            Latitude
            Longitude
            FK_TypeOffer{
               ID_TypeOffer
              TypeOffer
            }
            State
          }
       }
       `, variables: {
        Id_User: Id_User
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).offersByUser);
        }, (error) => {
          return reject(error);
        });
    })
  }

  AgregarOfertas(NombreServicio: string,
    Precio: string,
    Longitud: string,
    Latitud: string,
    Descripcion: string,
    TypoOferta: string,
    Imagen: string,
    User_id: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .mutate({
          mutation: gql`
          mutation($NombreServicio:String!,
            $Precio:String!,
            $Longitud:String!,
            $Latitud:String!,
            $Descripcion:String!,
            $TypoOferta:String!,
            $Imagen:String!,
            $User_id:String!
            ){
            RegisterOffert(
              User_id:$User_id,
              Imagen:$Imagen,
              TypoOferta:$TypoOferta,
              Descripcion: $Descripcion,
              Latitud:$Latitud,
              Longitud:$Longitud,
              Precio:$Precio,
              NombreServicio:$NombreServicio
            ){
              ID_Offer
              ServiceName
              ServiceDescription
              Price
              Date
              Latitude
              Longitude
              FK_TypeOffer{
                ID_TypeOffer
                TypeOffer
              }
              State
            }
          }
       `, variables: {
        User_id:User_id,
        Imagen:Imagen,
        TypoOferta:TypoOferta,
        Descripcion:Descripcion,
        Latitud:Latitud,
        Longitud:Longitud,
        Precio:Precio,
        NombreServicio:NombreServicio
          }
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).RegisterOffert);
        }, (error) => {
          return reject(error);
        });
    })
  }


  ObtenerFoto(ID_Offer: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($ID_Offer:String!){
        GetImage(Id_Offer:$ID_Offer)
       }
       `, variables: {
        ID_Offer:ID_Offer}
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).GetImage);
        }, (error) => {
          return reject(error);
        });
    })
  }

  ListarAmigos(id_user: string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($id_user:String!){
        ListarAmigos(id_user: $id_user) {
          FK_UserFriend {
            User
            FK_Person {
              ID_Person
              Name
              Lastname1
              Lastname2
            }
          }
        }
       }
       `, variables: {
        id_user:id_user}
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).ListarAmigos);
        }, (error) => {
          return reject(error);
        });
    })
  }


  AgregarAmigos(id_user: string, id_userFriend:string) {
    return new Promise<Array<any>>((resolve: any, reject) => {
      this.apollo
        .query({
          query: gql`
       query($id_user:String!, $id_userFriend:String!){
        AgregarAmigos(id_user:$id_user, id_userFriend:$id_userFriend)
       }
       `, variables: {
        id_user:id_user,id_userFriend:id_userFriend}
        }).subscribe(({ data }) => {
          return resolve(JSON.parse(JSON.stringify(data)).AgregarAmigos);
        }, (error) => {
          return reject(error);
        });
    })
  }

}
