const Users = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// load env Varibales
require('dotenv').config();

module.exports = {
    login: async (req, res) => {
        const user = await Users.findOne({email: req.body.email})
        try {
            if(user){
                const compareStatus = await bcrypt.compare(req.body.password, user.password)
                console.log(compareStatus)
                if(compareStatus) {
                    const token = jwt.sign(
                        {email: user.email, userId: user._id},
                        process.env.JWT_SECRET_TOKEN,
                        {expiresIn: "1hr"}
                    );
                    res.json({
                        status: {
                            message: "login successfully",
                            code: 200
                        },
                        data: {
                            token: token,
                            expiresIn: 3600 ,
                            userId: user._id
                        }
                    })
                    
                } else {
                    return res.status(401).json({
                        status: {
                            message: "Auth failed",
                            code: 401
                        }
                    })
                }
            }
            else {
                return res.status(401).json({
                    status: {
                        message: `${req.body.email}'s user doesn't exist in our database.`,
                        code: 401
                    }
                })
            }
        }
        catch(e) {
            console.log("Error has incountered: ", e);
            res.status(500).json({
                error: e,
                message: e.message,
                code: 500
            })
        }
        
    },
    signup: async (req, res) => {
        console.log(req.body)
        try {
            const hash = await bcrypt.hash(req.body.password, 10); // 10 is incrption level we have set
            const user = new Users({
                email: req.body.email,
                password: hash
            });

            const result = await user.save()
            res.json({
                status: {
                    message: "The user have been added into our database.", 
                    code: 201
                },
                data: result
            })
        }
        catch(e) {
            console.log("Error has incountered: ", e);
            res.status(500).json({
                error: e,
                message: e.message,
                code: 500
            })
        }
    }
}