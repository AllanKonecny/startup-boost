import { Request } from 'express';
import { IUser } from '@interfaces/users.interface';

export interface IDataStoredInToken {
    id: number;
}

export interface ITokenData {
    token: string;
    expiresIn: number;
}

export interface IRequestWithUser extends Request {
    user: IUser;
}
