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

        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.currentpage;
        const taskQuery = Task.find();

        if (pageSize && (currentPage > -1)) {
            taskQuery
            .skip( pageSize * (currentPage) )
            .limit( pageSize )
        }

        taskQuery
            .then(async tasks=>{
                res.json({
                    status: {
                        message: "Successfully got all documents.",
                        code: 200
                    },
                    data: tasks,
                    totalCount: await Task.count()
                });
            })
    
    }
}