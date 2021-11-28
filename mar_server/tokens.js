import jwt from 'jsonwebtoken';

// Create tokens
const createAccessToken = email => {
    return jwt.sign({ email }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '20m',
    });
};

const createRefreshToken = email => {
    return jwt.sign({ email }, `${process.env.REFRESH_TOKEN_SECRET}`, {
        expiresIn: '1d',
    });
};

// Send tokens
const sendAccessToken = (res, req, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email,
    });
};

const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    });
};

export {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
};