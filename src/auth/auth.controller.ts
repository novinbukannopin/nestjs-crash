import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guard/jwt.guard";
import { Enable2FA } from "./types/payload.types";
import { ValidateTokenDto } from "./dto/validate-token.dto";
import { UpdateResult } from "typeorm";
import { AuthGuard } from "@nestjs/passport";

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

  @Get("enable-2fa")
  @UseGuards(JwtGuard)
  enable2FA(@Request() req): Promise<Enable2FA> {
    return this.authService.enable2FA(req.user.userid);
  }

  @Post("verify-2fa")
  @UseGuards(JwtGuard)
  verify2FA(@Request() req, @Body() validateTokenDTO: ValidateTokenDto): Promise<{ verified: boolean }> {
    return this.authService.verify2FA(req.user.userId, validateTokenDTO.token);
  }

  @Get("disable-2fa")
  @UseGuards(JwtGuard)
  disable2FA(@Request() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Get("profile")
  @UseGuards(AuthGuard("bearer"))
  getProfile(@Request() req) {
    delete req.user.password;
    return {
      msg: "authenticated user by api key",
      user: req.user
    };
  }

  @Get("me")
  @UseGuards(JwtGuard)
  getMe(@Request() req) {
    delete req.user.password;
    return {
      msg: "authenticated user by api key",
      user: req.user
    };
  }

}
