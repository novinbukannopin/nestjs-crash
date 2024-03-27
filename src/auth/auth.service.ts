import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDTO } from "./dto/login.dto";
import { User } from "../users/entities/user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {

  }

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.usersService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

    if (passwordMatched) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
