import { Injectable } from '@nestjs/common';
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

@Injectable()
export class AppService {
  private isUpdateProjectInfo = false;

  getHello(): string {
    return 'Hello World!';
  }

  getEmitter() {
    return myEmitter;
  }

  setIsUpdateProjectInfo(_state) {
    this.isUpdateProjectInfo = _state;
  }

  getIsUpdateProjectInfo() {
    return this.isUpdateProjectInfo;
  }
}
