const bcrypt = require('bcryptjs');
const { User } = require('../../library/models');

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

module.exports = {
    registerUser,
};
