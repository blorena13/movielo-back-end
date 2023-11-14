import { SessionType, UserType } from "../protocols";

async function createUser(body: UserType){

}

async function createSession(body: SessionType){

}

const userService = {
    createUser,
    createSession
}

export default userService;