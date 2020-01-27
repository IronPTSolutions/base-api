const mongoose = require('mongoose')
const Column = require('../models/column.model')
const createError = require('http-errors');


module.exports.getAll = (_, res, next) => {
  Column.find()
  .populate('cards')
  .then(columns => {
    res.json({ columns })
  })
  .catch(next)
}

module.exports.create = (req, res, next) => {
  const { title, position } = req.body

  Column.create({
    title,
    position
  })
    .then(column => res.status(201).json(column))
    .catch(next)
}

module.exports.getDetail = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid ID')
  }
  Column.findById(id)
    .populate('cards')
    .then(
      column => {
        if (!column) {
          throw createError(404, 'Column not found')
        }
        res.json({ column })
      }
    )
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid ID')
  }
  Column.findByIdAndUpdate(id, req.body, { new: true })
    .then(column => {
      if (!column) {
        throw createError(404, 'Column not found')
      }
      res.status(200).json(column)
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid ID')
  }

  Column.findByIdAndDelete(id)
    .then(column => {
      if (!column) {
        throw createError(404, 'Column not found')
      }
      res.status(200).json(column)
    })
    .catch(next)
}