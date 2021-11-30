const jwt = require("jsonwebtoken")

// load env Varibales
require('dotenv').config();

module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userData = { email: decodedToken, userId: decodedToken.userId}
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