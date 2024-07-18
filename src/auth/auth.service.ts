import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-creadentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async signUp(userCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.userRepository.create({ username, password: hashedPassword })

    try {
      await this.userRepository.save(user)
      return user
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto
    const user = await this.userRepository.findOne({ where: { username } })

    if (user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username }
      const accessToken: string = this.jwtService.sign(payload)
      return { accessToken }
    } else {
      throw new UnauthorizedException('Wrong password')
    }

  }
}
