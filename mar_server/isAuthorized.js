import jwt from 'jsonwebtoken';

const isAuth = req => {
    const token = req.headers.accesstoken;
    if (!token) throw new Error('You need to login.');

    try {
        const user = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        return user.email;
    }
    catch (err) {
        return err;
    }
};

export {
    isAuth,
};