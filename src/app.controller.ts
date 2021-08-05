import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Sse,
  Header,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { interval, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from './users/users.service';
import { ProjectsAllService } from './projects-all/projects-all.service';
import { ProjectEntity } from './model/projects.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private servUser: UsersService,
    private pAServ: ProjectsAllService,
  ) {}

  @Get()
  async getHello() {
    this.appService.setIsUpdateProjectInfo(true);
    return this.appService.getHello();
  }

  @Post('api/auth/login')
  async login(@Request() req) {
    const result = await this.authService.login(req.body);
    return result;
  }

  @Sse('push')
  @Header('Content-Type', 'text/event-stream')
  @Header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, sessionid',
  )
  sse(@Query() query: { sessionId: string; userId: number }): Observable<any> {
    console.log('query FROM PUSH connection', query);
    return interval(3000).pipe(
      switchMap(() =>
        this.pAServ.getProjectsByUserId({ userId: query.userId }),
      ),
      map((_projects) => ({ data: _projects.filter((_p) => _p.isShared) })),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
