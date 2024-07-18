import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>;
    createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTaskById(id: string): Promise<Task>;
    updateTask(id: string, status: TaskStatus): Promise<Task>;
    deleteTask(id: string): Promise<DeleteResult>;
}
