import { City } from '../../cities/city.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Workstation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => City, (city: City) => city.workstations)
  @JoinColumn()
  city: City;

  @Column()
  phone: string;

  @Column()
  ip: string;

  @ManyToOne(
    () => Workstation,
    (workstation) => workstation.child_workstations,
    { nullable: true },
  )
  parent_workstation: Workstation;

  @OneToMany(
    () => Workstation,
    (workstation) => workstation.parent_workstation,
    { nullable: true },
  )
  child_workstations: Workstation[];

  @Column()
  gateway: string;
}
