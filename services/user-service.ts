import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/user";
import IToken from "../viewModels/tokenViewModel";
import UserRepository from "../repositories/user-repository";
import { Inject, Service } from 'typedi';

@Service()
export default class UserService {
    @Inject() private readonly userRepository: UserRepository


    async createUserAsync(userId: number, password: string): Promise<boolean> {
        if (await this.userRepository.getByIdAsync(userId)) {
            return false
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            let user: User = User.build({ id: userId, password: encryptedPassword })
            await this.userRepository.createAsync(user);
            return true
        }
    }

    async getAllAsync(): Promise<User[]> {
        let userRepository: UserRepository = new UserRepository();
        return await userRepository.getAllAsync();
    }
    async userLoginAsync(userId: number, password: string): Promise<IToken> {
        let userRepository: UserRepository = new UserRepository();
        const user = await userRepository.getByIdAsync(userId)
        const passwordDb: string = user.getDataValue('password')
        if (user) {
            const bcryptResult = await bcrypt.compare(password, passwordDb)
            if (bcryptResult) {
                console.log(process.env.TOKEN_KEY)
                const token = jwt.sign(
                    {
                        userId
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                return { expires_in: '2h', token: token }
            }
        }
    }
}

