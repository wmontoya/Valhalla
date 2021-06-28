import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Ratings } from "../entities/ratings";


@Resolver()
export class RatingResolver {

    constructor(){}
 
    @Query(() => [VHL_Ratings])
    async RatingbyIdOffer(@Arg("fk_offer") fk_offer: string) {
        return VHL_Ratings.find({ relations: ["FK_User", "FK_Offer"],where: {FK_Offer: fk_offer}});
    }

   


}