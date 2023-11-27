import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    profileImage: Joi.string().required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
})