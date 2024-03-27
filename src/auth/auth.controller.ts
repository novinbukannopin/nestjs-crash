import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private usersService: UsersService, private authService: AuthService) {
  }

  @Post("signup")
  signup(@Body() userDTO: CreateUserDto) {
    return this.usersService.create(userDTO);
  }

  @Post("signin")
  signin(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
