import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Persons } from './persons';


@ObjectType()
@Entity()
export class VHL_Parameters extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Parameter!:number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Type!:string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    Value!:string;

}