import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './dtos/user.repository';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dtos/get-user.dto';
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {

    }

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto)
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
            _id: new Types.ObjectId(),
        })
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.findOne({ email: createUserDto.email })
        } catch (err) {
            return;
        }
        throw new UnprocessableEntityException("email already exists")
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials not valid')
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return await this.userRepository.findOne(getUserDto)
    }
}
