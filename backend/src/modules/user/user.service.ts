import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeUserDto } from './dto/safe-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    return this.userRepository.create({
      ...userDto
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findByEmailWithPassword(email: string) {
    return this.userRepository.findByEmailWithPassword(email);
  }

  async findById(id: string): Promise<SafeUserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.safeUserResponse(user);
  }

  async update(id: string, updateDto: UpdateUserDto) {
    return this.userRepository.update(id, updateDto);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  private safeUserResponse(user: any): SafeUserDto {
    const { password, ...safeUser } = user.toObject();
    return safeUser as SafeUserDto;
  }
}
