const Task = require("../../models/Task");


module.exports = {
    getById: (req, res)=>{

        Task.findById(req.params.id)
            .then(task=>{
                res.json({
                    status: {
                        message: "Successfully got the document.",
                        code: 200
                    },
                    data: task
                });
            })
    },

    getAll: (req, res)=>{

        Task.find()
            .then(tasks=>{
                res.json({
                    status: {
                        message: "Successfully got all documents.",
                        code: 200
                    },
                    data: tasks
                });
            })
    
    }
}