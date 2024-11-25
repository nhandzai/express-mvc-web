const { RefreshToken } = require('../../library/models');
const userServices = require('./users-service');

var jwt = require('jsonwebtoken');
const getSignUp = (req, res) => {
    res.render('sign-up', { title: 'Sign Up' });
};
const getLogin = (req, res) => {
    res.render('login-in', { title: 'Log in' });
}

const createUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const user = await userServices.registerUser(fullName, email, password);
        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const authenticateUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const user = await userServices.loginUser(email, password);
        const accessToken = userServices.generateAccessToken(user);

        const refreshToken = userServices.generateAndStoreRefreshToken(user, rememberMe);
        req.session.user = user;

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ message: 'User logged in successfully.', user, accessToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required.' });
    }

    try {
        const storedToken = userServices.findRefreshToken;

        if (!storedToken) {
            return res.status(403).json({ message: 'Invalid refresh token.' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH, async (err, user) => {
            if (err) {
                await userServices.deleteRefreshToken
                return res.status(403).json({ message: 'Refresh token expired or invalid.' });
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = await generateAndStoreRefreshToken(user);

            await userServices.deleteRefreshToken

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });

            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getLogout = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out.' });
        }


        res.clearCookie('refreshToken');


        res.redirect('/');
    });
};

/*
const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {

        await RefreshToken.destroy({
            where: { token: refreshToken },
        });


        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logged out successfully.' });
    }

    return res.status(400).json({ message: 'No refresh token found.' });
};
*/
module.exports = {
    createUser, getSignUp, getLogin, authenticateUser, refreshToken, getLogout
};

