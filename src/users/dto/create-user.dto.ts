import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUser } from 'src/interfaces/user.interface';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: string;
}
