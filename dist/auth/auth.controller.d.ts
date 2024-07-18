import { AuthCredentialDto } from './dto/auth-creadentials.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(userCredentialDto: AuthCredentialDto): Promise<import("./user.entity").User>;
    signIn(userCredentialDto: AuthCredentialDto): Promise<{
        accessToken: string;
    }>;
}
