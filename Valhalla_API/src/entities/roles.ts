import {Entity, Column, PrimaryGeneratedColumn,BaseEntity, CreateDateColumn, Unique} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class VHL_Roles extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Rol!:number;
   
    @Column({  type: 'varchar', length: 15, nullable: false, unique: true })
    Rol!:string;
}