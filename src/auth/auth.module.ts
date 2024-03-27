import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constant/auth.constant";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "60m" }
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
}
