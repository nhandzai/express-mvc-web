const userServices = require('./users-service');
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
    const { email, password } = req.body;

    try {
        const user = await userServices.loginUser(email, password);
        res.status(201).json({ message: 'User logged in successfully.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createUser, getSignUp, getLogin, authenticateUser
};

