import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Permissions } from "../entities/permissions";

@Resolver()
export class PermissionResolver {

    constructor(){}

    @Query(() => [VHL_Permissions])
    async permission() {
        return VHL_Permissions.find();
    }
 
    @Mutation(() => Number)
    public async RegisterPermission(
        @Arg("permission") permission: string,
        @Arg("guard") guard: string,
    ) {
        let idresult;
        try {
            await VHL_Permissions.insert({
                Permission:permission,
                Guard:guard
            }).then((id)=>{
                idresult = id.identifiers[0]["ID_Permission"];
            });
            return idresult;
        } catch (err) {
            return 0;
        }
    }

}