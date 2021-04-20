import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn, Double} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Offers } from './offers';
import { VHL_TypeBadges } from './typebadgest';
import { VHL_Users } from './users';


@ObjectType()
@Entity()
export class VHL_Badges extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Badge!:number;

    @ManyToOne(type => VHL_TypeBadges, FK_Badges => FK_Badges.ID_TypeBadge,{nullable: false}) 
    @JoinColumn({ name: "FK_Badges" })
    FK_Badges!: number;

    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_User!: number;

    @ManyToOne(type => VHL_Offers, FK_Offer => FK_Offer.ID_Offer,{nullable: false}) 
    @JoinColumn({ name: "FK_Offer" })
    FK_Offer!: number;
}