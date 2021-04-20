import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class VHL_Permissions extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Permission!:number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    Permission!:string;

    @Column({ type: 'varchar', length:100, nullable: false })
    Guard!:string;

}