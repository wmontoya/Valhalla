import {Resolver, Query, Mutation, Arg } from "type-graphql";

import { VHL_Roles } from "../entities/roles";

@Resolver()
export class RolResolver {

    constructor(){}

    @Query(() => [VHL_Roles])
    async rol() {
        return VHL_Roles.find();
    }
 
    @Mutation(() => Number)
    public async RegisterRol(
        @Arg("rol") rol: string,
    ) {
        let idresult;
        try {
            await VHL_Roles.insert({
                Rol:rol
            }).then((id)=>{
                idresult = id.identifiers[0]["ID_Rol"];
            });
            return idresult;
        } catch (err) {
            return 0;
        }
    }

}