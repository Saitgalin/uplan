import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { PlanDto } from './dto/plan.dto';

@ApiTags('plan')
@Controller('plan')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PlanController {
  constructor(private planService: PlanService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createPlan(
    @Req() req,
    @Body() createPlanDto: CreatePlanDto,
  ): Promise<PlanDto> {

    return await this.planService.create(
      req.user.username,
      createPlanDto.id,
      createPlanDto.data,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlanDto> {
    return await this.planService.findById(id);
  }
}
