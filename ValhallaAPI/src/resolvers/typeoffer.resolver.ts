import {Resolver, Query, Mutation, Arg } from "type-graphql";


import { VHL_TypeOffers } from "../entities/typeoffers";


@Resolver()
export class TypeOfferResolver {

    constructor(){}

    @Query(() => [VHL_TypeOffers])
    async allTypeOffers() {
        return VHL_TypeOffers.find();
    }
 
 

}