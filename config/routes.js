const express = require('express')
const router = express.Router()
const controller = require('../controllers/base.controller')
const columnsController = require('../controllers/columns.controller')
const cardsController = require('../controllers/cards.controller')

router.get('/', controller.base)

//columns
router.get('/columns', columnsController.getAll)
router.post('/columns', columnsController.create)
router.get('/columns/:id', columnsController.getDetail)
router.patch('/columns/:id', columnsController.update)
router.delete('/columns/:id', columnsController.delete)

router.get('/cards', cardsController.getAll)
router.post('/cards', cardsController.create)
router.get('/cards/:id', cardsController.getDetail)
router.patch('/cards/:id', cardsController.update)
router.delete('/cards/:id', cardsController.delete)


module.exports = router