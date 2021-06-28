import { Entity, PrimaryGeneratedColumn,BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { Field, ID, ObjectType } from "type-graphql";
import { VHL_Users } from './users';

@ObjectType()
@Entity()
export class VHL_Friends extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    ID_Friend!:number;

    @Field(() => VHL_Users)
    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_User" })
    FK_User!: VHL_Users;

    @Field(() => VHL_Users)
    @ManyToOne(type => VHL_Users, FK_User => FK_User.ID_User,{nullable: false}) 
    @JoinColumn({ name: "FK_UserFriend" })
    FK_UserFriend!: VHL_Users;
}