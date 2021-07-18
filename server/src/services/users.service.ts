import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { IUser } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
    public users = userModel;

    public async findAllUser(): Promise<IUser[]> {
        return this.users;
    }

    public async findUserById(userId: number): Promise<IUser> {
        const findUser: IUser = this.users.find(user => user.id === userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        return findUser;
    }

    public async createUser(userData: CreateUserDto): Promise<IUser> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: IUser = this.users.find(user => user.email === userData.email);
        if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData: IUser = { id: this.users.length + 1, ...userData, password: hashedPassword };
        this.users = [...this.users, createUserData];

        return createUserData;
    }

    public async updateUser(userId: number, userData: CreateUserDto): Promise<IUser[]> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: IUser = this.users.find(user => user.id === userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.users.map((user: IUser) => {
            if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
            return user;
        });
    }

    public async deleteUser(userId: number): Promise<IUser[]> {
        const findUser: IUser = this.users.find(user => user.id === userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        return this.users.filter(user => user.id !== findUser.id);
    }
}

export default UserService;
