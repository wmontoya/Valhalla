import {Resolver, Query, Mutation, Arg } from "type-graphql";

import { VHL_TypeBadges } from "../entities/typebadgest";


@Resolver()
export class TypeBadguesResolver {

    constructor(){}

    @Query(() => [VHL_TypeBadges])
    async allTypeBadgues() {
        return VHL_TypeBadges.find();
    }
 
  

}