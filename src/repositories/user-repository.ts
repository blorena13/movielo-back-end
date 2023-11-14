import { SessionType, UserType } from "../protocols";

async function createUser(body: UserType){

}

async function createSession(body: SessionType){

}

const userRepository = {
    createUser,
    createSession
}

export default userRepository;