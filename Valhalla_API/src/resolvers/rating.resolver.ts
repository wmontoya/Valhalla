import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Ratings } from "../entities/ratings";


@Resolver()
export class RatingResolver {

    constructor(){}
 
    @Mutation(() => VHL_Ratings)
    public async RantingById(
        @Arg("fk_offer") fk_offer: string
    ) {
        try {
            return await VHL_Ratings.findOne({
                relations: ["FK_User", "FK_Offer"], 
                where: { FK_Offer:fk_offer } 
            });
        } catch (err) {
            return err;
        }
    }

}