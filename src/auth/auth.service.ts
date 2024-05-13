import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ArtistsService } from "src/artists/artists.service";
import { Enable2FA, PayloadTypes } from "./types/payload.types";
import * as speakeasy from "speakeasy";
import { UpdateResult } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService
  ) {
  }

  async login(loginDTO: LoginDTO): Promise<{ access_token: string } | { validate2FA: string; message: string }> {
    const user = await this.usersService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

    if (passwordMatched) {
      delete user.password;

      const payload: PayloadTypes = { email: user.email, userId: user.id };

      const artist = await this.artistsService.findArtist(user.id);

      if (artist) {
        payload.artistId = artist.id;
      }

      if (user.enable2FA && user.twoFASecret) {
        return {
          validate2FA: "http://localhost:3000/auth/verify-2fa",
          message: "Please send the OTP to verify your identity from Google Authenticator app"
        };
      }

      return {
        access_token: this.jwtService.sign(payload)
      };
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }

  async enable2FA(userId: number): Promise<Enable2FA> {
    const user = await this.usersService.findById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }

    const secret = speakeasy.generateSecret();
    console.log(secret);
    user.twoFASecret = secret.base32;
    await this.usersService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async verify2FA(userId: number, token: string): Promise<{ verified: boolean }> {
    try {
      const user = await this.usersService.findById(userId);

      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: token,
        encoding: "base32"
      });

      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (error) {
      throw new UnauthorizedException("Error verifying token");
    }
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersService.disable2FA(userId);
  }

  async validateUserByApiKey(apiKey: string): Promise<User> {
    return this.usersService.findByApiKey(apiKey);
  }
}
