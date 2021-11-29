const jwt = require("jsonwebtoken")

// load env Varibales
require('dotenv').config();

module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        next();
    }
    catch(e) { 
        res.status(401).json({
            status: {
                message: "Auth Failed",
                code: 401
            }
        })
    }
    

}