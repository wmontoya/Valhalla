import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Offers } from "../entities/offers";
import { VHL_Ratings } from "../entities/ratings";
import { VHL_Users } from "../entities/users";


@Resolver()
export class RatingResolver {

    constructor(){}
 
    @Query(() => [VHL_Ratings])
    async RatingbyIdOffer(@Arg("fk_offer") fk_offer: string) {
        return VHL_Ratings.find({ relations: ["FK_User", "FK_Offer"],where: {FK_Offer: fk_offer}});
    }

    @Query(() => String)
    async AgregarCalificacion(
        @Arg("id_user") id_user: string,
        @Arg("fk_oferta") fk_oferta: string,
        @Arg("ranting") ranting: string
        ) {
            let toDay = new Date();
            let usuario = await VHL_Users.findOne({where:{User:id_user}})
            let response;
            let user = new VHL_Users();
            user.ID_User = usuario!.ID_User;
            let oferta = new VHL_Offers()
            oferta.ID_Offer =Number.parseInt(fk_oferta);
        await VHL_Ratings.insert({
            FK_User:user,
            Date: toDay.getFullYear()+"-"+(toDay.getMonth()+1) +"-"+toDay.getDate(),
            FK_Offer:oferta,
            Rating:Number.parseInt(ranting)
        }).then((friend)=>{
            response = friend.identifiers[0]["ID_Rating"];
        });
        return response;
    }
   


}