import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn, Double} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';
import { VHL_Users } from './users';


@ObjectType()
@Entity()
export class VHL_Reviews extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Review!:number;

    @Column({ type: 'varchar', length: 2000, nullable: false })
    Review!:string;

    @Column({  type: 'datetime', nullable: false })
    Date!:string;

    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_User!: number;

    @ManyToOne(type => VHL_Offers, FK_Offer => FK_Offer.ID_Offer,{nullable: false}) 
    @JoinColumn({ name: "FK_Offer" })
    FK_Offer!: number;
}