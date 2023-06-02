import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { Plan } from '@prisma/client';
import { PlanDto } from './dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async create(username: string, id: string, data: string): Promise<Plan> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new BadRequestException(`not found user: ${username}`);
    }

    const findedPlan = await this.prismaService.plan.findUnique({
      where: {
        id,
      },
    });

    if (findedPlan) {
      throw new BadRequestException(`Plan with id ${id} already exists`);
    }

    const plan = await this.prismaService.plan.create({
      data: {
        id,
        data,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    delete plan['userId'];

    return plan;
  }

  async findById(id: string): Promise<PlanDto> {
    const plan = await this.prismaService.plan.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        data: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(`Plan with id ${id} not found`);
    }

    return plan;
  }
}
