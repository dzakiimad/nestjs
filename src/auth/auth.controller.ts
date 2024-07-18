import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-creadentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signUp')
  signUp(@Body() userCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(userCredentialDto)
  }

  @Post('/signIn')
  signIn(@Body() userCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(userCredentialDto)
  }

}
