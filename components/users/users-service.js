const bcrypt = require('bcryptjs');
const { User, RefreshToken } = require('../../library/models');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const registerUser = async (fullName, email, password) => {
    if (!fullName || !email || !password) {
        throw new Error('All fields are required.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        return user;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Email already in use.');
        }
        throw new Error('Server error.');
    }
};
const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error('All fields are required.');
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found.')
            throw new Error('User not found.');

        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid credentials.')
            throw new Error('Invalid credentials.');

        }

        return user;
    } catch (error) {

        if (error.message === 'User not found.' || error.message === 'Invalid credentials.') {
         
            throw error;
        }
       
        throw new Error('Server error.');
    }
};

const generateAccessToken = (user) => {
    const a = jwt.sign({ id: user.id }, process.env.JWT_ACCESS, { expiresIn: '1h' });

    return jwt.sign({ id: user.id }, process.env.JWT_ACCESS, { expiresIn: '1h' });
};

const generateAndStoreRefreshToken = async (user, rememberMe = false) => {
    const expiration = rememberMe ? '30d' : '7d';
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH, { expiresIn: expiration });

    await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000),
    });

    return refreshToken;
};

const findRefreshToken = async (token) => {
    return await RefreshToken.findOne({ where: { token } });
};

const deleteRefreshToken = async (token) => {
    await RefreshToken.destroy({ where: { token } });
};



module.exports = {
    registerUser, loginUser, generateAccessToken, generateAndStoreRefreshToken, findRefreshToken, deleteRefreshToken
};
