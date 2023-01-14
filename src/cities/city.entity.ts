import { Workstation } from '../workstations/entities/workstation.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @OneToMany(
    () => Workstation,
    (workstation: Workstation) => workstation.city,
    { cascade: true },
  )
  workstations: Relation<Workstation>[];
}
