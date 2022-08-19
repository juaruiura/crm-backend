import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username)
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: User) {
        const payload = { username: user.username }
        return { access_token: this.jwtService.sign(payload) }
    }
}