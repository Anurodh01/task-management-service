import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Priority, TaskStatus } from 'src/models/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title is Too Short!' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Description is too short!' })
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
