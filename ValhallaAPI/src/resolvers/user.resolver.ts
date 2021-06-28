import { Resolver,Query,Mutation,Arg,ObjectType,Field, UseMiddleware, Ctx } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { VHL_Users } from "../entities/users";

import enviroment from "../config/enviroments.config";
import { sign } from "jsonwebtoken";
import { PersonResolver} from "../resolvers/person.resolver"
import { VHL_Persons } from "../entities/persons";
import { VHL_Roles } from "../entities/roles";
import { isAuthenticated } from "../middleware/is-authenticated";
import { Context } from "../interfaces/context.interface";

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
        return VHL_Users.find({ relations: ["FK_Person", "FK_Rol"] });
    }

    @Query(() => [VHL_Users])
    async UsuarioByUser( 
        @Arg("user") user: string
        ) {
        return VHL_Users.find({relations: ["FK_Person","FK_Rol"],where:{User:user}});
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
            let resultado:VHL_Persons = new VHL_Persons();
            let rol:VHL_Roles = new VHL_Roles();
            rol.ID_Rol = fk_rol;
            await person.then((per)=>{ resultado.ID_Person = per!})
            await VHL_Users.insert({
                User:user,
                FK_Person: resultado,
                FK_Rol: rol,
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
        if (!users) {
            throw new Error("Usuario No Encontrado");
        }
        const verify = await compare(password, users!.Password);

        if (!verify) {
            throw new Error("Contraseña Incorrecta");
        }
       
        return {
            accessToken: sign({ user: user }, enviroment.jwtSecretKey, {
                expiresIn: "10h"
            })
            
        };
    }

  
}