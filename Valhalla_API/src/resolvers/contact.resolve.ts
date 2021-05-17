import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Contacts } from "../entities/contacts";


@Resolver()
export class ContactsResolver {

    constructor(){}

    @Mutation(() => [VHL_Contacts])
    async contactsByPerson(@Arg("fk_persona") fk_persona: string) {
        return VHL_Contacts.find({ relations: ["FK_Persona"], where:{FK_Persona:fk_persona} });
    }

}