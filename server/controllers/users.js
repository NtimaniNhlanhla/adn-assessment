const knex =  require('../config/db/knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// @desc   Register a User
// @route  POST /api/v1/users/register
// @access Public
exports.registerUser = async (req, res) => {

    const { name, email, password} = req.body;

    try {
       // check if email already exist
        const userExists = await knex('users').where({email});

        if(userExists.length > 0 ) {
            return res.status(404).send('Unable to create user, Email already exists.')
        }

        // hash password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // create user
        await knex('users').insert({name, email, password: hashedPassword})  
        return res.status(201).json({
                    success: true,
                    message: 'User created successfuly!'
                 });
        
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
   

}

// @desc   Login
// @route  POST /api/v1/users/login
// @access Public
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {

        // Validate email and password
        if(!email || !password) {
            return res.status(400).send('Please provide an email and password')
        }

        // Check for user
        const user = await knex('users').where({email});
        
        if(!user.length) {
            return res.status(401).send('Invalid credentials')
        }

        // check if password matches
        const isMatch =  await bcrypt.compare(password, user[0].password)
      
        if(!isMatch) {
            return res.status(401).send('Invalid credentials')  
        }

        // create token and sign in user
        const token = jwt.sign({id: user[0].id, name: user[0].name, email: user[0].email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000),
            httpOnly: true
        }

       return res.status(200)
                 .cookie('token', token, options)
                 .json({
                    success: true,
                    token
                 })


    } catch (error) {
       
        res.status(500).json({ error: error.message }); 
    }
}

exports.logout = async (req, res) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}