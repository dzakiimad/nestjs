import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) { }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {

    const { search, status } = filterDto

    const query = this.tasksRepository.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title ilike :search OR task.description ilike :search)', { search: `%${search}%` })
    }
    const tasks = await query.getMany()
    return tasks
  }

  async createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = CreateTaskDto

    const task = this.tasksRepository.create({
      status: TaskStatus.OPEN,
      title,
      description,
      user
    })

    await this.tasksRepository.save(task)
    return task
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } })

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return found
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const found = await this.getTaskById(id)

    found.status = status

    await this.tasksRepository.save(found)

    return found
  }


  async deleteTask(id: string): Promise<DeleteResult> {
    const deleted = await this.tasksRepository.delete(id)
    return deleted
  }
}
