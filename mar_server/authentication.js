import User from "./model/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
} from './tokens.js';
import EmailValidator from 'email-validator';

const register = async (req, res) => {
    const { firstname, lastname, email, password, mobile, department, year } = req.body;
    if (!(firstname && email && password && department && year)) {
        res.send({ status: "error", message: "Please enter all rquired fields" });
    }
    //---------------------------------
    if (!EmailValidator.validate(email)) {
        res.send({ status: "error", message: "Please enter a valid email" });
    }
    //----------------------------------
    try {
        const newPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstname,
            lastname,
            email,
            password: newPassword,
            mobile,
            department,
            year,
            refreshtoken: "",
        });
    } catch (err) {
        res.send({ status: 'error', error: 'User already exist' });
    }
    res.send({ status: 'ok', message: 'User succesfully created' });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: `${email}` });
    try {
        if (!user) throw new Error("User not exist");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Incorrect password")

        const accesstoken = createAccessToken(user.email);
        const refreshtoken = createRefreshToken(user.email);

        await User.updateOne({ email }, { refreshtoken });

        //console.log(user);
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(res, req, accesstoken);
    }
    catch (err) {
        res.send({ status: "error", message: `${err.message}` });
    }

}

const logout = (_req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({
        message: 'Logged out',
    });
}

const refreshToken = async (req, res) => {
    const token = req.cookies.refreshtoken;
    if (!token) return res.send({ status: "error", message: "No cookie", accesstoken: '' });
    let payload = null;
    try {
        payload = jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`);
    } catch (err) {
        return res.send({ status: "error", message: "Refresh token not valid", accesstoken: '' });
    }
    //console.log(payload);
    const user = await User.findOne({ email: `${payload['email']}` });
    //console.log(user)
    if (!user) return res.send({ status: "error", message: "User not exist", accesstoken: '' });
    //console.log(user.refreshtoken);
    //console.log(token);
    if (user.refreshtoken !== token)
        return res.send({ status: "error", message: "Unmatching refresh token", accesstoken: '' });
    //creating new tokens with email address
    const accesstoken = createAccessToken(user.email);
    const refreshtoken = createRefreshToken(user.email);

    await User.updateOne({ email: `${payload['email']}` }, { refreshtoken }).catch((err) => { status: "error", { err } });

    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
}


export { register, login, logout, refreshToken };