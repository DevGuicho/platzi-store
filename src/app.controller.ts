import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
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
  @Public()
  @Get('/ruta/')
  getRuta(): string {
    return '<h1>Holas nest</h1>';
  }
  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
