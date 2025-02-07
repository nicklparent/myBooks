const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hash(password, 10);

    try{
        const user_id = await User.create({username, email, password: hashedPassword});
        res.status(200).json({message: 'User created', user_id});    
    } catch (e){
        res.status(500).json({message: 'Error signing up', e});
    }
}

const loginWithUsername = async (req, res) => {
    const {username, password} = req.body;
    
    try {
        const user = await User.findByUsername(username);
        if (!user){
            return res.status(500).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(user.password, password);
        if (!isMatch){
            return res.status(400).json({message: 'invalid password'});
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token })
    } catch (e) {
        res.json({message: 'Error Loging in with username', e})
    }
}