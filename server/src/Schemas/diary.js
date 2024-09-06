const mongoose = require('mongoose');

// Define the schema for an audio journal entry
const AudioEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  content: {
    type: String,  // You might store a URL or a path to the audio file
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the `updatedAt` field before saving
AudioEntrySchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

// Create and export the model
const diary = mongoose.model('diary', AudioEntrySchema);
module.exports = diary;
