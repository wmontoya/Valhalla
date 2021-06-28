import { Entity, Column, PrimaryGeneratedColumn,BaseEntity} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class VHL_TypeBadges extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_TypeBadge!:number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 50, nullable: false })
    Badge!:string;
}