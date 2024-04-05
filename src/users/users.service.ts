import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { LoginDTO } from "../auth/dto/login.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDTO.firstName;
    user.lastName = createUserDTO.lastName;
    user.email = createUserDTO.email;
    user.apiKey = uuid();

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDTO.password, salt);

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException("Could not find user");
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      userId, {
        twoFASecret: secret, enable2FA: true
      });
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update({ id: userId }, {
      enable2FA: false,
      twoFASecret: ""
    });
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.userRepository.findOneBy({ apiKey: apiKey });
  };


}
