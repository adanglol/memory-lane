
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudioSchema = new Schema({
  filename: String,
  data: Buffer,
  contentType: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Diary = mongoose.model('Diary', AudioSchema);
module.exports = Diary;