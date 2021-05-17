import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';




const url = 'http://localhost:3000/valhalla_api/';

@Injectable()
export class AppService {

  constructor(private apollo: Apollo) {}

  login(user:string, pass:string){
    return new Promise<Array<any>>((resolve:any, reject) => {
     this.apollo
      .mutate({
        mutation: gql`
        mutation($user:String!,$password:String!){
          Login(user:$user, password:$password){
            accessToken
          }
        }
        `,
        variables:{
          user:user,
          password:pass
        }
      }).subscribe(({ data }) => {
        return resolve(JSON.parse(JSON.stringify(data)).Login.accessToken);
      },(error) => {
        return reject (error);
      });
    });
  }

  listarTodoTipoOfertas(){
   return new Promise<Array<any>>((resolve:any, reject) => {
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
    },(error) => {
      return reject (error);
    });
   }) 
   
  }

  listarTop10Ofertas(){
    return new Promise<Array<any>>((resolve:any, reject) => {
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
     },(error) => {
       return reject (error);
     });
    }) 
   }

   obtenerResenasPorId(fk_offer:string){
    return new Promise<Array<any>>((resolve:any, reject) => {
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
       `,variables:{
         fk_offer:fk_offer
       }
     }).subscribe(({ data }) => {
       return resolve(JSON.parse(JSON.stringify(data)).ReviewById);
     },(error) => {
       return reject (error);
     });
    }) 
   }

   obtenerCalificacionesPorId(fk_offer:string){
    return new Promise<Array<any>>((resolve:any, reject) => {
     this.apollo
     .mutate({
       mutation: gql`
       mutation($fk_offer:String!){
        RantingById(fk_offer:$fk_offer){
          Date
          Rating
           FK_User{
             User
           }
         }
       }
       `,variables:{
         fk_offer:fk_offer
       }
     }).subscribe(({ data }) => {
       return resolve(JSON.parse(JSON.stringify(data)).RantingById);
     },(error) => {
       return reject (error);
     });
    }) 
   }

   obtenerContactosPorPersona(fk_persona:string){
    return new Promise<Array<any>>((resolve:any, reject) => {
     this.apollo
     .mutate({
       mutation: gql`
       mutation($fk_persona:String!){
        contactsByPerson(fk_persona:$fk_persona){
          Contact
          TypeContact
         }
       }
       `,variables:{
        fk_persona:fk_persona
       }
     }).subscribe(({ data }) => {
       return resolve(JSON.parse(JSON.stringify(data)).contactsByPerson);
     },(error) => {
       return reject (error);
     });
    }) 
   }

}
