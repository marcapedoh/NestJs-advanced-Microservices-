import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './dtos/user.repository';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {

    }

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create({
            ...createUserDto,
            _id: new Types.ObjectId(),
        })
    }
}
