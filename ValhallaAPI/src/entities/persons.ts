import {Entity, Column, PrimaryGeneratedColumn,BaseEntity, CreateDateColumn, Unique} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class VHL_Persons extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Person!:number;
   
    @Field(() => String)
    @Column({  type: 'varchar', length: 20, nullable: false, unique: true })
    IdentificationID!:string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 25, nullable: false })
    Name!:string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 25, nullable: false })
    Lastname1!:string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 25, nullable: false })
    Lastname2!: string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 1000, nullable: false })
    Direction!: string;

}