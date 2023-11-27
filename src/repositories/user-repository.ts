import { prisma } from "../config";
import { SessionType, UserType } from "../protocols";

async function createUser(body: UserType) {
    return await prisma.user.create({
        data: {
            email: body.email,
            profileImage: body.profileImage,
            name: body.name,
            username: body.username,
            password: body.password
        }
    });
}

async function createSession(token: string, userId: number) {
    return await prisma.session.create({
        data: {
            token,
            userId
        }
    })
}

async function getByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {
            email
        }
    });
}

async function getByUsername(username: string) {
    return await prisma.user.findFirst({
        where: {
            username
        }
    })
}

const userRepository = {
    createUser,
    createSession,
    getByEmail,
    getByUsername
}

export default userRepository;