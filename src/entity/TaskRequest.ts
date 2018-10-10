import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { TaskExecution } from './TaskExecution';

@Entity()
export class TaskRequest {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => TaskExecution, execution => execution.requests)
  public execution: TaskExecution;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;
}
