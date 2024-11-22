const userService = require('./users-service');
const getSignUp = (req, res) => {
    res.render('sign-up', { title: 'Sign Up' });
  };

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const user = await userService.registerUser(fullName, email, password);
        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,getSignUp
};

