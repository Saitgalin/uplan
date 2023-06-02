import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Credentials } from './interfaces/credentials.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<Credentials> {
    return await this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Credentials> {
    return await this.authService.signUp(signUpDto);
  }
}
