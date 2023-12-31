import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { badRequestError } from "../errors/bad-request-error";
import { SessionType, UserType } from "../protocols";
import userRepository from "../repositories/user-repository";
import { notFoundError } from '../errors';
import { invalidCredentialsError } from '../errors';

async function createUser(body: UserType, password: string) {
    if (!body.email || !body.profileImage || !body.name || !body.username || !password) {
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
    const hashedPassword = await bcrypt.hash(password, 12);
    return await userRepository.createUser(body, hashedPassword);
}

async function createSession(body: SessionType) {
    if (!body.email || !body.password) {
        throw badRequestError();
    }

    const user = await userRepository.getByEmail(body.email);
    if (!user) {
        throw notFoundError();
    }

    await validatePasswordOrFail(body.password, user.password);
    const userId = user.id;
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    const session = await userRepository.createSession(token, userId);
    const result = {
        ...session, profileImage: user.profileImage, username: user.username
    }
    return result;
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