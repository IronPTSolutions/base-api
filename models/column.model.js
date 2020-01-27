const mongoose = require('mongoose')
const Schema = mongoose.Schema

const columnSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
},{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

columnSchema.virtual('cards', {
	ref: 'Card',
	localField: '_id',
	foreignField: 'column',
	options: { sort: { position: -1 } }
})

const Column = new mongoose.model('Column', columnSchema)

module.exports = Column