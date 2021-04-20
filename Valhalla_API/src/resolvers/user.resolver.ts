import { Resolver,Query,Mutation,Arg,ObjectType,Field } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { VHL_Users } from "../entities/users";

import enviroment from "../config/enviroments.config";
import { sign } from "jsonwebtoken";
import { PersonResolver} from "../resolvers/person.resolver"

@ObjectType()
class LoginResponse {
    @Field()
    accessToken?: string;
}

@Resolver()
export class UserResolver {
    constructor(private personresolver:PersonResolver){
        this.personresolver = new PersonResolver;
    }

    @Query(() => [VHL_Users])
    async users() {
        return VHL_Users.find();
    }
 
    @Mutation(() => String)
    async RegisterUser(
        @Arg("name") name: string,
        @Arg("lastname1") lastname1: string,
        @Arg("lastname2") lastname2: string,
        @Arg("identificationID") identificationID: string,
        @Arg("direction") direction: string,
        @Arg("fk_rol") fk_rol: number,
        @Arg("authenticated") authenticated: string,
        @Arg("user") user: string,
        @Arg("state") state: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await hash(password, 8);
        
        try {
            
            let person =  this.personresolver.RegisterPerson(name,lastname1,lastname2,identificationID,direction);
            let resultado:number = 0;
            await person.then((per)=>{ resultado = parseInt(per!.toString());})
            await VHL_Users.insert({
                User:user,
                FK_Person: resultado,
                FK_Rol:fk_rol,
                State:state,
                Authenticated:authenticated,
                Password: hashedPassword
            });
            const userr = await VHL_Users.findOne({ where: { User:user } });
            return userr?.ID_User;
        } catch (err) {
            return "Fallo al Registrar el usuario "+ err;
        }
    }

    @Mutation(() => LoginResponse)
    async Login(@Arg("user") user: string, @Arg("password") password: string) {
        let users = await VHL_Users.findOne({ where: { User:user } });
        if (!user) {
            throw new Error("Could not find user");
        }
        const verify = await compare(password, users!.Password);

        if (!verify) {
            throw new Error("Bad password");
        }
        return {
            accessToken: sign({ user: user }, enviroment.jwtSecretKey, {
                expiresIn: "10h"
            })
        };
    }
}