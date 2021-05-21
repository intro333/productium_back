import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  async login(user: User) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);
    user.password = password;
    user.salt = salt;
    let result = {};

    /* Create user */
    await this.usersService
      .createUser(user)
      .then((_user) => {
        const payload = {
          username: _user.fullName,
          sub: user.id,
        };
        result = {
          userId: user.id,
          accessToken: this.jwtService.sign(payload),
        };
      })
      .catch(() => {
        result = { error: 'user_not_create' };
      });

    return result;
  }
}
