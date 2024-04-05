import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtGuard } from "./auth/guard/jwt.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("profile")
  @UseGuards(JwtGuard)
  getProfile(@Request() request) {
    return request.user;
  }
}
