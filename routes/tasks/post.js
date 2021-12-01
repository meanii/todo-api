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
                message: "Successfully posted the documents.",
                code: 201
            },
            data: task
        });
    
    },

    // getUserTask: (req, res)=>{
    //     const userid = req.headers.userid
    //     const taskQuery = Task.find({"creator": userid});

    //     taskQuery
    //         .then(async tasks=>{
    //             res.json({
    //                 status: {
    //                     message: "Successfully got allx documents.",
    //                     code: 200
    //                 },
    //                 data: tasks
    //             });
    //         }).catch(e=>{
    //             res.status(500).json({
    //                 status: {
    //                     message: e.message,
    //                     code: 500,
    //                 }
    //             });
    //         });
    
    // }
}