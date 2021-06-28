import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Persons } from './persons';


@ObjectType()
@Entity()
export class VHL_Contacts extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Contact!:number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 30, nullable: false })
    TypeContact!:string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 60, nullable: false })
    Contact!:string;

    @Field(() => VHL_Persons)
    @ManyToOne(type => VHL_Persons, FK_Persona => FK_Persona.ID_Person,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_Persona!: VHL_Persons;
 
}