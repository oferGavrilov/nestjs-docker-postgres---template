import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService) { }

    async validateUser(username: string, password: string): Promise<any> {
        // const user = await this.usersService.findOne(username);
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        // return null;
    }

    async login(user: any) {
        // const payload = { username: user.username, sub: user.userId };
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
    }
}