const  jwt = require('jsonwebtoken')
const knex =  require('../config/db/knex')

// protected routes
exports.authenticated = async (req, res, next) => {
    let token;

        if(req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
                
                // Set token from Bearer token in header
                token = req.headers.authorization.split(' ')[1]
            }

        if(!token) {
            return res.status(401).send('Not authorised to access this route')
        }    
    
      try {
        // Verify token
        let decodedToken;
        
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) throw err;


            decodedToken = decoded
        })

        req.user = await knex('users').where({id: decodedToken.id})

        next();
      } catch (error) {
       
        return res.status(401).send('Not authorised to access this route')
      }  
}