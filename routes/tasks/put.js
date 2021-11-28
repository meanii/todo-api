const Task = require("../../models/Task");


module.exports = {
    updateTask: (req, res) => {

        const url = req.protocol + "://" + req.get("host");
        let imagePath = req.body.imagePath
        if(req.file){
            imagePath = url + '/images/' + req.file.filename;
        }
        const task = new Task({
            _id: req.body._id,
            title: req.body.title,
            description: req.body.description,
            imagePath: imagePath
        });
    
        Task.updateOne({_id: req.body._id}, task)
        .then(()=> {
            res.json({
                status: {
                    message: "Successfully updated the document.",
                    code: 201
                },
                data: task
            })
        })
    }
}