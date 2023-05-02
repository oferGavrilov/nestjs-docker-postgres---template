import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password)
        try {

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
            delete user.hash
            return user
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    throw new ForbiddenException('Email already exists')
                }
            }
            throw err
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        })
        if (!user) throw new ForbiddenException('Email or password is wrong')
        const isPasswordValid = await argon.verify(user.hash, dto.password)
        if (!isPasswordValid) throw new ForbiddenException('Email or password is wrong')
        delete user.hash
        return user
    }
}