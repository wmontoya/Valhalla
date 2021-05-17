import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Authorized, Int } from "type-graphql";
import { VHL_Persons } from "./persons";
import { VHL_Roles } from "./roles";

@ObjectType()
@Entity()
export class VHL_Users extends BaseEntity {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_User!: number;
 
    @Field(() => String)
    @Column({ type: 'varchar', length: 25, nullable: false, unique:true })
    User!: string;

    @Column({ type: 'varchar', length: 1000, nullable: false })
    Password!: string;

    @Field(() => VHL_Persons)
    @ManyToOne(type => VHL_Persons, FK_Person => FK_Person.ID_Person,{nullable: false}) 
    @JoinColumn({ name: "FK_Person" })
    FK_Person!: VHL_Persons;

    @Field(() => VHL_Roles)
    @ManyToOne(type => VHL_Roles, FK_Rol => FK_Rol.ID_Rol,{nullable: false}) 
    @JoinColumn({ name: "FK_Rol" })
    FK_Rol!: VHL_Roles;

    @Field(() => String)
    @Column({ type: 'varchar', length: 1, nullable: false })
    Authenticated!: string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 1, nullable: false })
    State!: string;

}