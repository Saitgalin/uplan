import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(username: string, pass: string): Promise<User> {
    const userInDb = await this.findByUsername(username);
    if (userInDb) {
      throw new ConflictException(`User ${username} already exists`);
    }

    const hashedPass = await this.hashPassword(pass);
    if (!hashedPass) {
      throw new InternalServerErrorException(`Create user ${username} error`);
    }

    return this.prismaService.user.create({
      data: {
        username,
        password: hashedPass,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  private async hashPassword(password, saltRounds = 10) {
    try {
      const salt = await genSalt(saltRounds);
      return await hash(password, salt);
    } catch (e) {
      Logger.error(e);
    }

    return null;
  }
}
