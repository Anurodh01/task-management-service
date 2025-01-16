import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Table
export class Task extends Model<Task> {
  @PrimaryKey
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  title: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [...Object.values(TaskStatus)],
  })
  status: TaskStatus;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: [...Object.values(Priority)],
  })
  priority: Priority;
}
