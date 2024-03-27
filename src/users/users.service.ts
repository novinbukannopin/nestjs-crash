import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { LoginDTO } from "../auth/dto/login.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
    const user = await this.userRepository.save(createUserDTO);
    delete user.password;
    return user;
  }

  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException("Could not find user");
    }
    return user;
  }
}
