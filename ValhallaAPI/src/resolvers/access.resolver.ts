import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Accesses } from "../entities/accesses";

@Resolver()
export class AccessResolver {

    constructor(){}

    @Query(() => [VHL_Accesses])
    async access() {
        return VHL_Accesses.find();
    }
 
    @Mutation(() => Number)
    public async RegisterAccess(
        @Arg("fk_rol") fk_rol: number,
        @Arg("fk_permission") fk_permission: number,
    ) {
        let idresult;
        try {
            await VHL_Accesses.insert({
                FK_Rol:fk_rol,
                FK_Permmission:fk_permission
            }).then((id)=>{
                idresult = id.identifiers[0]["ID_Access"];
            });
            return idresult;
        } catch (err) {
            return 0;
        }
    }

}