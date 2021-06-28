import {Resolver, Query, Mutation, Arg } from "type-graphql";
import { VHL_Contacts } from "../entities/contacts";
import { VHL_Friends } from "../entities/friends";
import { VHL_Users } from "../entities/users";


@Resolver()
export class FriendResolver {

    constructor(){}

    @Query(() => [VHL_Friends])
    async ListarAmigos(
        @Arg("id_user") id_user: string
        ) {
        return VHL_Friends.find({ relations: ["FK_User","FK_UserFriend","FK_UserFriend.FK_Person"], where:{FK_User:id_user} });
    }

    @Query(() => String)
    async AgregarAmigos(
        @Arg("id_user") id_user: string,
        @Arg("id_userFriend") id_userFriend: string
        ) {
            let usuario = await VHL_Users.findOne({where:{User:id_user}})
            let response;
            let user = new VHL_Users();
            user.ID_User = usuario!.ID_User;
            let friend = new VHL_Users();
            friend.ID_User = Number.parseInt(id_userFriend);
        await VHL_Friends.insert({FK_User:user,FK_UserFriend:friend}).then((friend)=>{
            response = friend.identifiers[0]["ID_Friend"];
        });
        return response;
    }


}