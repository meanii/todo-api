const Task = require("../../models/Task");


module.exports = {
    deleteTask: (req, res) => {
        
        Task.deleteOne({_id: req.params.id})
        .then(()=>{
            res.json({
                status: {
                    message: "Successfully got deleted.",
                    code: 201
                }
            })
        })
    }
}