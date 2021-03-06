import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';

@ObjectType()
@Entity()
export class VHL_TypeOffers extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_TypeOffer!:number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 50, nullable: false })
    TypeOffer!:string;
}