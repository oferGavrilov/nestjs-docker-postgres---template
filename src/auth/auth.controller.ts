import { Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService) {}

    @Post('signup')
    async signUp(@Req() req: Request) {
        // return this.authService.signUp();
        return "signUp"
    }
    @Post('signin')
    async signIn() {
        // return this.authService.signIn();
        return "signIn"
    }
}