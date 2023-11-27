import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { badRequestError } from "../errors/bad-request-error";
import { SessionType, UserType } from "../protocols";
import userRepository from "../repositories/user-repository";
import { notFoundError } from '../errors';
import { invalidCredentialsError } from '../errors';

async function createUser(body: UserType) {
    if (!body.email || !body.profileImage || !body.name || !body.username || !body.password) {
        throw badRequestError();
    }
    const existsEmail = await userRepository.getByEmail(body.email);
    if(existsEmail){
        throw badRequestError("Email already exists!");
    }
    const existsUsername = await userRepository.getByUsername(body.username);
    if(existsUsername){
        throw badRequestError("Username already exists!");
    }
    return await userRepository.createUser(body);
}

async function createSession(body: SessionType, userId: number) {
    if (!body.email || !body.password) {
        throw badRequestError();
    }

    const user = await userRepository.getByEmail(body.email);
    if (!user) {
        throw notFoundError();
    }

    await validatePasswordOrFail(body.password, user.password);
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return await userRepository.createSession(token, userId);
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
  }

const userService = {
    createUser,
    createSession
}

export default userService;