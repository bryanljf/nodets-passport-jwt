import { TypeUser, User } from "../models/User";
import jwt from 'jsonwebtoken';

export const findUserByEmailAndPassword = async (email: string, password: string) => {
    if (email === User.email && password === User.password) {
        return User;
    }
    else {
        return null;
    }
}

export const createUserToken = (user: TypeUser) => {
    const payload = {
        id: user.id
    }

    return "Bearer " + jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn: '1 minute'
    });
}

export const findUserByToken = async (token: string) => {
    //consultar BD
    if(token === "1234"){
        const user: TypeUser = {
            email: User.email,
                password: ''
            }
    }else {
        return null;
    }
}

export const findUserById = async (id: number) => {
    if (id === 1){
        return User
    }

    return null;
}