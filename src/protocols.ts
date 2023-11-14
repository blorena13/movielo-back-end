export type AplicationError = {
    name: string;
    message: string;
};

export type UserType = {
    email: string;
    profileImage: string;
    name: string;
    username: string;
    password: string;
}

export type SessionType = {
    userId: number;
    token: string;
}