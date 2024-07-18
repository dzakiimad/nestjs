"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("./task-status.enum");
const task_entity_1 = require("./task.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async getTasks(filterDto) {
        const { search, status } = filterDto;
        const query = this.tasksRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title ilike :search OR task.description ilike :search)', { search: `%${search}%` });
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createTask(CreateTaskDto, user) {
        const { title, description } = CreateTaskDto;
        const task = this.tasksRepository.create({
            status: task_status_enum_1.TaskStatus.OPEN,
            title,
            description,
            user
        });
        try {
            await this.tasksRepository.save(task);
            return task;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getTaskById(id) {
        try {
            const found = await this.tasksRepository.findOne({ where: { id } });
            if (!found) {
                throw new common_1.NotFoundException(`Task with id ${id} not found`);
            }
            return found;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateTask(id, status) {
        try {
            const found = await this.getTaskById(id);
            found.status = status;
            await this.tasksRepository.save(found);
            return found;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteTask(id) {
        try {
            const deleted = await this.tasksRepository.delete(id);
            return deleted;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map