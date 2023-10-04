import { Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  async run() {
    return new Promise((resolve) => {
      console.log('SeederService.run()');
      return resolve({});
    });
  }
}
