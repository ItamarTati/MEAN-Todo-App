const Todo = require('../models/todo.model.js');



exports.findAll = (req, res) => {
    Todo.find()
    .then(todos => {
        res.send(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving todos."
        });
    });
};


exports.create = (req, res) => {
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        hasEnded: req.body.hasEnded,
        timestamps: req.body.timestamps,
    });
    todo.save()
      .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
      message: err.message || "Something went wrong while creating new todo."
    });
    });
    };
    exports.findOne = (req, res) => {
    Todo.findById(req.params.id)
      .then(todo => {
      if(!todo) {
       return res.status(404).send({
       message: "todo not found with id " + req.params.id
     });
    }
     res.send(todo);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
        message: "todo not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error getting todo with id " + req.params.id
    });
    });
    };
    exports.update = (req, res) => {
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
    Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        hasEnded: req.body.hasEnded,
        timestamps: req.body.timestamps,
    }, {new: true})
    .then(todo => {
     if(!todo) {
       return res.status(404).send({
       message: "todo not found with id " + req.params.id
     });
    }
    res.send(todo);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
      message: "todo not found with id " + req.params.id
    });
    }
    return res.status(500).send({
      message: "Error updating todo with id " + req.params.id
    });
    });
    };
    exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
    if(!todo) {
      return res.status(404).send({
      message: "todo not found with id " + req.params.id
    });
    }
    res.send({message: "todo deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
      message: "todo not found with id " + req.params.id
    });
    }
    return res.status(500).send({
      message: "Could not delete todo with id " + req.params.id
    });
    });
    };