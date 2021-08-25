import { Service } from "typedi";
import User from "../models/user";
import IBaseRepository from "./base-repository";


@Service()
export default class UserRepository implements IBaseRepository<User> {
    constructor() {

    }

    async getByIdAsync(userId: number): Promise<User> {
        return await User.findOne({ where: { id: userId } })
    }

    async createAsync(model: User): Promise<void> {
        await model.save()
    }


    async getAllAsync(): Promise<User[]> {
        return await User.findAll()
    }






}