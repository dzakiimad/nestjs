import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAllTask(filterDto: GetTaskFilterDto): Promise<Task[]>;
    createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTaskById(id: string): Promise<Task>;
    deleteTask(id: string): Promise<import("typeorm").DeleteResult>;
    patchTask(id: string, UpdateTaskDto: UpdateTaskDto): Promise<Task>;
}
