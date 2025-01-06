import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { USERS_REPOSITORY } from 'src/resources/constanst';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: typeof User,
  ) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    const email = 'admin@example.com';
    const existingAdmin = await this.findByEmail(email);
    if (!existingAdmin) {
      const adminData = {
        name: 'Administrador',
        email,
        password: 'admin',
        role: 'admin',
      };
      await this.create(adminData);
    }
  }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.usersRepository.create<User>({ ...createUserDto });
  }

  async findAll() {
    return await this.usersRepository.findAll<User>({
      where: { isActive: true },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findAll<User>({
      where: { isActive: true, id: id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
  }
  async findByEmail(email: string) {
    return await this.usersRepository.findOne<User>({
      where: { email: email, isActive: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update<User>(updateUserDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.usersRepository.update<User>(
      { isActive: false },
      {
        where: { id: id, isActive: false },
      },
    );
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  public async comparePasswords(newPassword: string, passwordHash: string) {
    return await bcrypt.compare(newPassword, passwordHash);
  }
}
