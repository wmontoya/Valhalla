import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Persons } from './persons';


@ObjectType()
@Entity()
export class VHL_Titles extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Title!:number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    TitleName!:string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    TitleInstitution!:string;

    @Column({  type: 'varchar', length: 4, nullable: false })
    StartYear!:string;

    @Column({  type: 'varchar', length: 4,  nullable: false })
    EndYear!:string;

    @ManyToOne(type => VHL_Persons, FK_Person => FK_Person.ID_Person,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_Person!: number;

}