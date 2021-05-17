import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn, Double} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Users } from './users';
import { VHL_TypeOffers } from './typeoffers';


@ObjectType()
@Entity()
export class VHL_Offers extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Offer!:number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 30, nullable: false })
    ServiceName!:string;

    @Field(() => String)
    @Column({ type: 'varchar', length: 200, nullable: false })
    ServiceDescription!:string;

    @Field(() => String)
    @Column({  type: 'double', nullable: false })
    Price!:Double;

    @Field(() => String)
    @Column({  type: 'date', nullable: false })
    Date!:String;

    @Field(() => String)
    @Column({  type: 'varchar', length: 40,  nullable: false })
    Latitude!:string;

    @Field(() => String)
    @Column({  type: 'varchar', length: 40,  nullable: false })
    Longitude!:string;

    @Field(() => VHL_Users)
    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_User" })
    FK_User!: VHL_Users;

    @Field(() => VHL_TypeOffers)
    @ManyToOne(type => VHL_TypeOffers, FK_TypeOffer => FK_TypeOffer.ID_TypeOffer,{nullable: false}) 
    @JoinColumn({ name: "FK_TypeOffer" })
    FK_TypeOffer!: VHL_TypeOffers;

    @Field(() => String)
    @Column({  type: 'varchar', length: 1,  nullable: false })
    State!:string;
}