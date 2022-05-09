import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  hello() {
    return 'hello nest';
  }
}
