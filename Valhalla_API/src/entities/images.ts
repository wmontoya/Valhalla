import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';

@ObjectType()
@Entity()
export class VHL_Images extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Image!:number;

    @Column({ type: 'mediumblob', nullable: false })
    Image!:string;

    @ManyToOne(type => VHL_Offers, FK_Offer => FK_Offer.ID_Offer,{nullable: false}) 
    @JoinColumn({ name: "FK_Offer" })
    FK_Offer!: number;

}