import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import { VHL_Offers } from "../entities/offers";
import { VHL_Reviews } from "../entities/reviews";
import { VHL_Users } from "../entities/users";

@Resolver()
export class ReviewsResolver {

    constructor(){}
 
    @Query(() => [VHL_Reviews])
    async allReviews() {
        return VHL_Reviews.find({ relations: ["FK_User", "FK_Offer"]});
    }
    

    @Mutation(() => [VHL_Reviews])
    public async ReviewById(
        @Arg("fk_offer") fk_offer: string
    ) {
        try {
            return await VHL_Reviews.find({
                relations: ["FK_User", "FK_Offer"], 
                where: { FK_Offer:fk_offer } 
            });
        } catch (err) {
            return err;
        }
    }

    @Query(() => String)
    async AgregarResena(
        @Arg("id_user") id_user: string,
        @Arg("fk_oferta") fk_oferta: string,
        @Arg("review") review: string
        ) {
            let toDay = new Date();
            let usuario = await VHL_Users.findOne({where:{User:id_user}})
            let response;
            let user = new VHL_Users();
            user.ID_User = usuario!.ID_User;
            let oferta = new VHL_Offers()
            oferta.ID_Offer =Number.parseInt(fk_oferta);
        await VHL_Reviews.insert({
            FK_User:user,
            Date: toDay.getFullYear()+"-"+(toDay.getMonth()+1) +"-"+toDay.getDate(),
            FK_Offer:oferta,
            Review:review
        }).then((friend)=>{
            response = friend.identifiers[0]["ID_Review"];
        });
        return response;
    }
   





}