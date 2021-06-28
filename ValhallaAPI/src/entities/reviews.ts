import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn, Double} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';
import { VHL_Users } from './users';


@ObjectType()
@Entity()
export class VHL_Reviews extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Review!:number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 2000, nullable: false })
    Review!:string;

    @Field(() => String)
    @Column({  type: 'date', nullable: false })
    Date!:Date;

    @Field(() => VHL_Users)
    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_User!: VHL_Users;

    @Field(() => VHL_Offers)
    @ManyToOne(type => VHL_Offers, FK_Offer => FK_Offer.ID_Offer,{nullable: false}) 
    @JoinColumn({ name: "FK_Offer" })
    FK_Offer!: VHL_Offers;
}