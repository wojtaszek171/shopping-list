import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    return this.userRepository.update(id, updateDto);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
