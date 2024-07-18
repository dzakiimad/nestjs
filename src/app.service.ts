import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  // constructor(private readonly userMemoryStorage: UsersMemoryStorage) { }

  getHello(): string {
    return `Hello !`;
  }

}
