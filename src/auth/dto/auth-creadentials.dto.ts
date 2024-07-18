import { IsString, Matches, MinLength } from "class-validator"

export class AuthCredentialDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @MinLength(3)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password is too weak!' })
  password: string
}   