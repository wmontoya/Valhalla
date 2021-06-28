import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';

@ObjectType()
@Entity()
export class VHL_Alerts extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Alert!:number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    Description!:string;

    @Column({  type: 'datetime', nullable: false })
    Date!:string;

    @ManyToOne(type => VHL_Offers, FK_Offer => FK_Offer.ID_Offer,{nullable: false}) 
    @JoinColumn({ name: "FK_Offer" })
    FK_Offer!: number;

    @Column({ type: 'varchar', length: 1, nullable: false })
    State!:string;
}