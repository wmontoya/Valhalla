import {Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { DeleteResult, InsertResult } from "typeorm";
import { VHL_Badges } from "../entities/badges";
import { VHL_Ratings } from "../entities/ratings";
import { VHL_Users } from "../entities/users";
import { isAuthenticated } from "../middleware/is-authenticated";


@Resolver()
export class BadguesResolver {

    constructor(){}

    @Query(() => [VHL_Badges])
    async access() {
        return VHL_Badges.find();
    }
 
    @Mutation(() => [VHL_Badges])
    async BadguesbyIdOffer(@Arg("id_offer") id_offer: string) {
        return VHL_Badges.find({ relations: ["FK_User","FK_Offer","FK_Badges",],where: {FK_Offer: id_offer}});
    }
  
 
    @Mutation(() => VHL_Badges)
    async RegisterBadges(
        @Arg("id_offer") id_offer: string,
        @Arg("id_typeBadges") id_typeBadges: string,
        @Arg("id_user") id_user: string,
    ) {
        try {
            
            let idUser = await VHL_Users.findOne({ where: {User :id_user} });
            let response;
            await VHL_Badges.insert({
                FK_Badges:Number.parseInt( id_typeBadges),
                FK_User: idUser?.ID_User,
                FK_Offer: Number.parseInt(id_offer)
            }).then((id)=>{
                response = id.identifiers[0]["ID_Badge"];
            });
            const badgess = await VHL_Badges.find({
                relations: ["FK_User","FK_Offer","FK_Badges",],
                where:{ID_Badge:response}
            });
            
             return badgess[0];
        } catch (err) {
            return "Fallo al Registrar el usuario "+ err;
        }
    }

    @Mutation(() => String)
    async getIdBadges(
        @Arg("id_offer") id_offer: string,
        @Arg("id_typeBadges") id_typeBadges: string,
        @Arg("id_user") id_user: string,
    ) {
        try {
            let idUser = await VHL_Users.findOne({ where: {User :id_user} });
            let badgues = await VHL_Badges.findOne({ where: {FK_User :idUser?.ID_User, FK_Offer:id_offer, FK_Badges:id_typeBadges} });
            let Id_badge = badgues?.ID_Badge.toString();
            
             return Id_badge;
        } catch (err) {
            return "Fallo al Registrar el usuario "+ err;
        }
    }

    @Mutation(() => String)
    async DeleteBadges(
        @Arg("id_offer") id_offer: string,
        @Arg("id_typeBadges") id_typeBadges: string,
        @Arg("id_user") id_user: string,
    ) {
        try {
            
            let badgues ="0"; 
            await this.getIdBadges(id_offer,id_typeBadges,id_user).then((badguesId)=>{
                badgues= badguesId!.toString();
            });
            let response;
            await VHL_Badges.delete(badgues).then((del)=>{
                response = del.affected;
            });

             return response;
        } catch (err) {
            return "Fallo al Registrar el usuario "+ err;
        }
    }


}