import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Reviews } from "../entities/reviews";

@Resolver()
export class ReviewsResolver {

    constructor(){}
 

    

    @Mutation(() => VHL_Reviews)
    public async ReviewById(
        @Arg("fk_offer") fk_offer: string
    ) {
        try {
            return await VHL_Reviews.findOne({
                relations: ["FK_User", "FK_Offer"], 
                where: { FK_Offer:fk_offer } 
            });
        } catch (err) {
            return err;
        }
    }

}