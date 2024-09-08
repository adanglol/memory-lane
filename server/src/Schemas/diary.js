
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  audioUrl: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
