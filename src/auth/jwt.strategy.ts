import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super({
      secretOrKey: 'rahasia',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    try {
      const { username } = payload
      const user = await this.userRepository.findOne({ where: { username } })

      if (!user) {
        throw new UnauthorizedException()
      }
      return user

    } catch (error) {
      console.log(error);

    }

  }
}