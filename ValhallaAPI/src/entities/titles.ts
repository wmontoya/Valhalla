import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Persons } from './persons';


@ObjectType()
@Entity()
export class VHL_Titles extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Title!:number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 50, nullable: false })
    TitleName!:string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 50, nullable: false })
    TitleInstitution!:string;

    @Field(() => String)
    @Column({  type: 'varchar', length: 4, nullable: false })
    StartYear!:string;

    @Field(() => String)
    @Column({  type: 'varchar', length: 4,  nullable: false })
    EndYear!:string;

    @Field(() => VHL_Persons)
    @ManyToOne(type => VHL_Persons, FK_Person => FK_Person.ID_Person,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_Person!: number;

}