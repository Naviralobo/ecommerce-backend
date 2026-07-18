const jwt = require("jsonwebtoken")

function generateToken(user){
    return jwt.sign(//creates a unique token everytoime with the available token
        {
          id:user._id,email:user.email,role:user.role,  
        },
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN || "1h"}
    )
    }

    module.exports = generateToken;