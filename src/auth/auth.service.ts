import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username)
        if (user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: User) {
        const { isAdmin } = await this.usersService.getUser(user.username)
        const payload = { username: user.username, isAdmin: isAdmin }
        return { access_token: this.jwtService.sign(payload) }
    }
}