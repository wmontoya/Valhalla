import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,JoinColumn, Double} from 'typeorm';
import { ObjectType } from "type-graphql";
import { VHL_Users } from './users';


@ObjectType()
@Entity()
export class VHL_Offers extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_Offer!:number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    ServiceName!:string;

    @Column({ type: 'varchar', length: 30, nullable: false })
    ServiceDescription!:string;

    @Column({  type: 'double', nullable: false })
    Price!:Double;

    @Column({  type: 'datetime', nullable: false })
    Date!:string;

    @Column({  type: 'varchar', length: 40,  nullable: false })
    Latitude!:string;

    @Column({  type: 'varchar', length: 40,  nullable: false })
    Longitude!:string;

    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_Persona" })
    FK_User!: number;

    @Column({  type: 'varchar', length: 1,  nullable: false })
    State!:string;
}