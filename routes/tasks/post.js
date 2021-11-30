const Task = require("../../models/Task");


module.exports = {
    createTask: (req, res) =>{
        const url = req.protocol + "://" + req.get("host");
    
        // Task db schema
        console.log(req.body)
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            imagePath: url + '/images/' + req.file.filename,
            creator: req.userData.userId
        });
        task.save().catch(e=>{
            res.status(500).json({
                status: {
                    message: e.message,
                    code: 500,
                }
            });
        });
    
        res.json({
            status: {
                message: "Successfully posted the document.",
                code: 201
            },
            data: task
        });
    
    }
}