import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';

@ObjectType()
@Entity()
export class VHL_TypeOffers extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_TypeOffer!:number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    TypeOffer!:string;

    @ManyToOne(type => VHL_Offers, FK_Offer => FK_Offer.ID_Offer,{nullable: false}) 
    @JoinColumn({ name: "FK_Offer" })
    FK_Offer!: number;
}