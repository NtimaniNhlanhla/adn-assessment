const knex =  require('../config/db/')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc   Register a User
// @route  POST /api/v1/users/register
// @access Public
exports.registerUser = async (req, res) => {

    const { name, email, password} = req.body;

    try {
       // check if email already exist
        const userExists = await knex('users').where({email});

        if(userExists) {
            return res.status(404).send('Unable to create user, Email already exists.')
        }

        // hash password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // create user
        const user = await knex('users').insert({name, email, password: hashedPassword})  
        return res.status(201).send(user);
        
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
        if(!user) {
            return res.status(401).send('Invalid credentials')
        }

        // check if password matches
        const isMatch =  await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).send('Invalid credentials')  
        }

        // create token and sign in user
        const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET, {
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