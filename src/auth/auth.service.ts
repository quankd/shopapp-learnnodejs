import { NextFunction } from "express";
import { AuthDto } from "./dtos/auth.dto";
import { userService, UserService } from "./user/user.service";
import {
  AuthenticationService,
  BadRequestError,
} from "@shopapp-learnnodejs/common";

export class AuthService {
  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService,
  ) {}

  async signup(AuthDto: AuthDto) {
    const existingUser = await this.userService.findOneByEmail(AuthDto.email);
    if (existingUser)
      return {message: "email is taken"}

    const newUser = await this.userService.create(AuthDto);

    const jwt = this.authenticationService.generateJwt(
      { email: AuthDto.email, userId: newUser.id },
      process.env.JWT_KEY!,
    );

    return {jwt};
  }
  async signin(signinDto: AuthDto) {
    const user = await this.userService.findOneByEmail(signinDto.email);
    if (!user) return {message: "wrong credentials"};

    const samePwd = this.authenticationService.pwdCompare(
      user.password,
      signinDto.password,
    );

    if (!samePwd) return {message: "wrong credentials"};
    const jwt = this.authenticationService.generateJwt(
      { email: user.email, userId: user.id },
      process.env.JWT_KEY!,
    );
    return {jwt};
  }
}

export const authService = new AuthService(
  userService,
  new AuthenticationService(),
);
