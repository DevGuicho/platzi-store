import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('nuevo')
  getNuevo(): string {
    return '<h1>Hola Mundo</h1>';
  }
  @Get('/ruta/')
  getRuta(): string {
    return '<h1>Holas nest</h1>';
  }
}
