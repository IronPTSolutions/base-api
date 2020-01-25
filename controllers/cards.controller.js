const Card = require('../models/card.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
	Card.find()
		.then(
			cards => res.json(cards)
		)
		.catch(next);
}

module.exports.get = (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		throw createError(400, 'Invalid ID');
	}
	Card.findById(req.params.id)
		.then(
			card => {
				if (!card) {
					throw createError(404, 'Card not found');
				}
				res.json(card);
			}
		)
		.catch(next);
}

module.exports.create = (req, res, next) => {
	const card = new Card(req.body);
	card.save()
		.then(
			card => res.status(201).json(card)
		)
		.catch(next);
}

module.exports.update = (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		throw createError(400, 'Invalid ID');
	}
	Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(
			card => {
				if (!card) {
					throw createError(404, 'Card not found');
				} else {
					res.json(card);
				}
			}
		)
		.catch(next);
}

module.exports.delete = (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		throw createError(400, 'Invalid ID');
	}
	Card.findByIdAndDelete(req.params.id)
		.then(
			card => {
				if (!card) {
					throw createError(404, 'Card not found');
				} else {
					res.status(204).json();
				}
			}
		)
		.catch(next);
}