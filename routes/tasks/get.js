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

        const userid = req.headers.userid
        var dbQuery = {}
        if(userid != undefined){
            dbQuery = {"creator": userid}
        }
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.currentpage;
        const taskQuery = Task.find(dbQuery);
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
            }).catch(e=>{
                res.status(500).json({
                    status: {
                        message: e.message,
                        code: 500,
                    }
                });
            });
    
    }
}