import {Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { VHL_Offers } from "../entities/offers";
import {Between} from "typeorm";
import { VHL_TypeOffers } from "../entities/typeoffers";
import { VHL_Reviews } from "../entities/reviews";
import { isAuthenticated } from "../middleware/is-authenticated";
import { VHL_Users } from "../entities/users";
import { VHL_Images } from "../entities/images";


@Resolver()
export class OfferResolver {

    constructor(){}

    @Query(() => [VHL_Offers])
    async offers() {
        return VHL_Offers.find();
    }

    @Query(() => [VHL_Offers])
    async offersByUser(
        @Arg("Id_user") Id_user: string,
    ) {
        return VHL_Offers.find({where:{FK_User:Id_user},relations:["FK_User","FK_TypeOffer"]});
    }

    
    @Query(() => [VHL_Offers])
    async offerstop10() {
        return (await VHL_Offers.find({ where:{State:"A"},
            relations: ["FK_User", "FK_TypeOffer","FK_User.FK_Person"],
            order:{ID_Offer:"DESC"},
            
        }));
    }


    @Query(() => [VHL_TypeOffers])
    async typeoffers() {
        return VHL_TypeOffers.find();
    }
 

    @Mutation(() => VHL_Offers)
    public async GetOfferByDates(
        @Arg("fechaInicio") fechaInicio: string,
        @Arg("fechaFin") fechaFin: string,
    ) {
        try {
            let idresult = await VHL_Offers.find({Date:Between(fechaInicio, fechaFin)});
            return idresult;
        } catch (err) {
            return 0;
        }
    }

    @Mutation(() => VHL_Offers)
    public async RegisterOffert(
        @Arg("NombreServicio") NombreServicio: string,
        @Arg("Precio") Precio: string,
        @Arg("Longitud") Longitud: string,
        @Arg("Latitud") Latitud: string,
        @Arg("Descripcion") Descripcion: string,
        @Arg("TypoOferta") TypoOferta: string,
        @Arg("Imagen") Imagen: string,
        @Arg("User_id") User_id: string,
    ) {
        try {
            let toDay = new Date();
            let response;
            let FK_TypeOffer = new VHL_TypeOffers();
            FK_TypeOffer.ID_TypeOffer = Number.parseInt(TypoOferta);
            let FK_UserOffer = new VHL_Users();
            FK_UserOffer.ID_User = Number.parseInt(User_id);
             await VHL_Offers.insert({
                ServiceName:NombreServicio,
                Price:Precio,
                Longitude:Longitud,
                Latitude:Latitud,
                ServiceDescription:Descripcion,
                FK_User:FK_UserOffer,
                FK_TypeOffer: FK_TypeOffer,
                State:"P",
                Date: toDay.getFullYear()+"-"+(toDay.getMonth()+1) +"-"+toDay.getDate()
            }).then((id)=>{
                response = id.identifiers[0]["ID_Offer"];
            }).catch((r)=>{
                response = r;
            });
            await VHL_Images.insert({Image:Imagen,FK_Offer:response});
           return await VHL_Offers.findOne({where:{ID_Offer:response},relations: [ "FK_TypeOffer"],});
          
        } catch (err) {
            return 0;
        }
    }
  


}