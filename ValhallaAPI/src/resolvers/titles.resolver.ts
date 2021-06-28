import {Resolver, Query, Mutation, Arg } from "type-graphql";

import { VHL_Roles } from "../entities/roles";
import { VHL_Titles } from "../entities/titles";

@Resolver()
export class TitleResolver {

    constructor(){}

    @Query(() => [VHL_Titles])
    async titles() {
        return VHL_Titles.find();
    }
 
    
    @Query(() => [VHL_Titles])
    async ObtenerTitulos(
        @Arg("id_person") id_person: string,
    ) {
        return VHL_Titles.find({where:{FK_Person:id_person}});
    }
 
}