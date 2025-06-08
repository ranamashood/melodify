import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      return null;
    }

    const isMatch = await compare(pass, user.password);

    if (!isMatch) {
      return null;
    }

    const { password, ...result } = user.toObject();
    return result;
  }

  async login(user: LoginRequestDto) {
    const userFound = await this.validateUser(user.username, user.password);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const payload = { username: userFound.username, sub: userFound._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterRequestDto) {
    const existingUser = await this.usersService.findOneByUsername(
      user.username,
    );

    if (existingUser) {
      throw new BadRequestException('username already exists');
    }

    const hashedPassword = await hash(user.password, 10);
    const newUser: User = { ...user, password: hashedPassword };

    await this.usersService.create(newUser);

    return this.login(user);
  }
}
