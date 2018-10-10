import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Task } from './Task';
import { TaskRequest } from './TaskRequest';

export enum TaskExecutionStatus {
  Pending,
  Started,
  Done,
  Cancelled,
  Failed
}

@Entity()
export class TaskExecution {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => Task, { nullable: false })
  public task: Task;

  @Column({ type: 'enum', enum: TaskExecutionStatus })
  public status: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  public startedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  public updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  public doneAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  public cancelledAt: Date;

  @OneToMany(type => TaskRequest, request => request.execution)
  public requests: TaskRequest[];
}
