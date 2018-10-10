import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { TaskExecution } from './TaskExecution';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public path: string;

  @OneToOne(type => TaskExecution, { nullable: true, onUpdate: 'SET NULL' })
  @JoinColumn()
  public lastExecution: TaskExecution;

  @OneToOne(type => TaskExecution, { nullable: true, onUpdate: 'SET NULL' })
  @JoinColumn()
  public activeExecution: TaskExecution;

  @OneToOne(type => TaskExecution, { nullable: true, onUpdate: 'SET NULL' })
  @JoinColumn()
  public nextExecution: TaskExecution;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public lastUpdatedAt: Date;
}
