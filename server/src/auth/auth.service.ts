import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from './interfaces/credentials.interface';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp({ username, password }: SignUpDto): Promise<Credentials> {
    const user = await this.userService.createUser(username, password);

    const payload = { username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn({ username, password }: SignInDto): Promise<Credentials> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
