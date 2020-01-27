const mongoose = require('mongoose')
const Card = require('../models/card.model')
const Column = require('../models/column.model')
const createError = require('http-errors');

module.exports.getAll = (_, res, next) => {
  Card.find()
    .then(card => {
      res.json({ card })
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
  Column.findById(req.body.column)
    .then(() => {
      Card.create(req.body)
        .then(card => {
          res.status(201).json(card)
        })
    })
    .catch(next)
}

module.exports.getDetail = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid ID')
  }
  Card.findById(id)
    .then(card => {
      if (!card) {
        throw createError(400, 'Card not found')
      }
      res.status(200).json(card)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid ID')
  }
  Card.findByIdAndUpdate(id, req.body, { new: true })
    .then((card) => {
      res.status(200).json(card)
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError(400, 'Invalid ID')
  }

  Card.findByIdAndDelete(id)
    .then(card => {
      res.status(200).json(card)
    })
    .catch(next)
}