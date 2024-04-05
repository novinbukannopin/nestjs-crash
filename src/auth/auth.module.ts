import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant/auth.constant";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { ArtistsModule } from "../artists/artists.module";
import { ApiKeyStrategy } from "./api-key/api-key.strategy";

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60m" }
    })],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
}
