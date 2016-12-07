var mongoose = require('mongoose');

var metricSchema = new mongoose.Schema({
  source: { type: String, required: true, index: true },
	event: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId },
  country: { type: String, required: true},
  device: { type: String, required: true},
  version: { type: String, required: true },
});

module.exports = mongoose.model('Metric', metricSchema);
