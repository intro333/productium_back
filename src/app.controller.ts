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
import { interval, Observable, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from './users/users.service';
import { ProjectsAllService } from './projects-all/projects-all.service';
// import { ProjectEntity } from './model/projects.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private servUser: UsersService,
    private pAServ: ProjectsAllService,
  ) {}

  private message = 'world 1';

  @Get()
  async getHello(@Query() query: { message: string }) {
    this.message = query.message;
    const emitter = this.appService.getEmitter();
    emitter.emit('event');
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
    let data = { projects: [] };
    const emitter = this.appService.getEmitter();
    emitter.on('event', () => {
      console.log('Event from userId: ' + query.userId);
      this.pAServ
        .getProjectsByUserId({ userId: query.userId })
        .then((_projects) => {
          data = { projects: _projects };
          setTimeout(() => {
            data = { projects: [] };
          }, 1000);
          // console.log('Event data: ' + _projects.length);
        });
    });
    return interval(1000).pipe(map((_) => ({ data })));
    // return interval(60000).pipe(
    //   switchMap(() =>
    //     this.pAServ.getProjectsByUserId({ userId: query.userId }),
    //   ),
    //   map((_projects) => ({ data: _projects.filter((_p) => _p.isShared) })),
    // );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
