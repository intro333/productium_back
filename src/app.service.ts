import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private isUpdateProjectInfo = false;

  getHello(): string {
    return 'Hello World!';
  }

  setIsUpdateProjectInfo(_state) {
    this.isUpdateProjectInfo = _state;
  }

  getIsUpdateProjectInfo() {
    return this.isUpdateProjectInfo;
  }
}
