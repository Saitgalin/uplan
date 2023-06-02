import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
