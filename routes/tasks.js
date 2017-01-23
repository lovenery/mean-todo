var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://test:test@ds127389.mlab.com:27389/mean-todo', ['todos'])

router.get('/todos', function (req, res, next) {
  db.todos.find(function (err, todos) {
    if (err) {
      res.send(err)
    }
    res.json(todos)
  })
})

router.get('/todo/:id', function (req, res, next) {
  db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, todo) {
    if (err) {
      res.send(err)
    }
    res.json(todo)
  })
})

router.post('/todo', function (req, res, next) {
  let todo = req.body
  if (!todo.title || !(todo.isDone + '')) {
    res.status(400)
    res.json({
      "error": "Bad Request"
    })
  } else {
    db.todos.save(todo, function (err, todo) {
      if (err) {
        res.send(err)
      }
      res.json(todo)
    })
  }
})

router.delete('/todo/:id', function (req, res, next) {
  db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, todo) {
    if (err) {
      res.send(err)
    }
    res.json(todo)
  })
})

router.put('/todo/:id', function (req, res, next) {
  let todo = req.body
  let updateTodo = {}

  if (todo.isDone) {
    updateTodo.isDone = todo.isDone
  }
  if (todo.title) {
    updateTodo.title = todo.title
  }

  if (!updateTodo) {
    res.status(400)
    res.json({
      "error": "Bad Data"
    })
  } else {
    db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updateTodo, {}, function (err, todo) {
      if (err) {
        res.send(err)
      }
      res.json(todo)
    })
  }
})

module.exports = router
