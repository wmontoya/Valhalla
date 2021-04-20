import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Persons } from './persons';


@ObjectType()
@Entity()
export class VHL_Contacts extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Contact!:number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    TypeContact!:string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    Contact!:string;

    @ManyToOne(type => VHL_Persons, FK_Persona => FK_Persona.ID_Person,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_Person!: number;

}