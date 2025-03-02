import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './dtos/user.repository';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {

    }

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
            _id: new Types.ObjectId(),
        })
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials not valid')
        }
        return user;
    }

}
