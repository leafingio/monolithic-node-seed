var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true, lowercase: true, index: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
  updated: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  display: { type: Boolean, default: true },
  type: { type: String, required: true },

  // owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
});

module.exports = mongoose.model('post', postSchema);
