//importing express core components
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
//mongodb object schemas
import User from './model/userSchema.js';
//
import { register, login, logout, refreshToken } from './authentication.js';
import { isAuth } from './isAuthorized.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
mongoose.connect(`${process.env.MONGODB_URL}`);

//------------------------------------------------
app.post("/api/signup", register);

app.post("/api/login", login);

app.post('/api/logout', logout);

app.post('/api/refresh_token', refreshToken);
//------------------------------------------------



app.get('/api/content', (req, res) => {
    const email = isAuth(req);
    if (!email) res.send({ status: "error", message: "User not verified" });

})

app.get("/api/user/:email", (req, res) => {
    const email = req.params.email;
    User.findOne({ "email": `${email}` }, (err, result) => {
        console.log(err);
        console.log(result);
        err && res.send(err);
        res.send(result);
    });
});

app.post("/api/updatemardata/:id", (req, res) => {

});

//--------------------------------------------------
app.listen(8000, () => {
    console.log("server listening ");
});
//--------------------------------------------------