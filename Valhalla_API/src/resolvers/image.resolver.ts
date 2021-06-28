import { response } from "express";
import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Images } from "../entities/images";

@Resolver()
export class ImageResolver {

    constructor(){}

    @Query(() => [String])
    async GetImage(
        @Arg("Id_Offer") Id_Offer: string,
    ) {
        let resposes;
        await VHL_Images.findOne({where:Id_Offer,relations:["FK_Offer"]}).then((img)=>{
            resposes = img!.Image
        });
        return resposes
    }

}