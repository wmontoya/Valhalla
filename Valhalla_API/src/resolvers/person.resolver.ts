import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Persons } from "../entities/persons";

@Resolver()
export class PersonResolver {

    constructor(){}

    @Query(() => [VHL_Persons])
    async persons() {
        return VHL_Persons.find();
    }
 
    @Mutation(() => Number)
    public async RegisterPerson(
        @Arg("name") name: string,
        @Arg("lastname1") lastname1: string,
        @Arg("lastname2") lastname2: string,
        @Arg("identificationID") identificationID: string,
        @Arg("direction") direction: string,
        
    ) {
        try {
            await VHL_Persons.insert({
                IdentificationID:identificationID,
                Name: name,
                Lastname1: lastname1,
                Lastname2: lastname2,
                Direction: direction
            });

            const person = await VHL_Persons.findOne({ where: { IdentificationID:identificationID } });
            return person?.ID_Person;
        } catch (err) {
            return 0;
        }
    }

}