import { Entity,BaseEntity, ManyToOne,JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Roles } from './roles';
import { VHL_Permissions } from './permissions';


@ObjectType()
@Entity()
export class VHL_Accesses extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Access!:number;

    @ManyToOne(type => VHL_Roles, FK_Rol => FK_Rol.ID_Rol,{nullable: false}) 
    @JoinColumn({ name: "FK_Rol" })
    FK_Rol!: number;

    @ManyToOne(type => VHL_Permissions, FK_Permmission => FK_Permmission.ID_Permission,{nullable: false}) 
    @JoinColumn({ name: "FK_Permission" })
    FK_Permmission!: number;
}