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
            console.log('1')
            throw error;
        }
        console.log('2')
        throw new Error('Server error.');
    }
};


module.exports = {
    registerUser,loginUser
};
