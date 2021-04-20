import { Entity, Column, PrimaryGeneratedColumn,BaseEntity} from 'typeorm';
import { ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class VHL_TypeBadges extends BaseEntity{

    @PrimaryGeneratedColumn()
    ID_TypeBadge!:number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Badge!:string;
}