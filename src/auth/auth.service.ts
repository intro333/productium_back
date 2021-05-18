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

    /* Create user */
    await this.usersService
      .createUser(user)
      .then((_user) => {
        const payload = {
          username: _user.fullName,
          password,
          id: user.id,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      })
      .catch(() => {
        return {
          error: 'user_not_create',
        };
      });
    console.log('2222222');
  }
}
