import { Workstation } from '../workstations/entities/workstation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @OneToMany(() => Workstation, (workstation: Workstation) => workstation.city)
  workstations: Relation<Workstation>[];
}
