import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Offers } from "../entities/offers";
import {Between} from "typeorm";
import { VHL_TypeOffers } from "../entities/typeoffers";


@Resolver()
export class OfferResolver {

    constructor(){}

    @Query(() => [VHL_Offers])
    async offers() {
        return VHL_Offers.find();
    }

    @Query(() => [VHL_Offers])
    async offerstop10() {
        return (await VHL_Offers.find({take:10 , 
            relations: ["FK_User", "FK_TypeOffer","FK_User.FK_Person"]
        }));
    }


    @Query(() => [VHL_TypeOffers])
    async typeoffers() {
        return VHL_TypeOffers.find();
    }
 
    // CANTIDAD DE SERVICIOS ENTRE FECHAS
    // tOP SERVICIOS MEJOR VALORADOS

    @Mutation(() => VHL_Offers)
    public async GetOfferByDates(
        @Arg("fechaInicio") fechaInicio: string,
        @Arg("fechaFin") fechaFin: string,
    ) {
        try {
            let idresult = await VHL_Offers.find({Date:Between(fechaInicio, fechaFin)});
            return idresult;
        } catch (err) {
            return 0;
        }
    }

}