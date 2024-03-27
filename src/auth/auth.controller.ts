import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private usersService: UsersService) {
  }

  @Post("signup")
  signup(@Body() userDTO: CreateUserDto) {
    return this.usersService.create(userDTO);
  }
}
