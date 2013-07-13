var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var projectSchema = new Schema({
    name:         { type: String, required: true },
    imageUrl:     { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ },
    description:  { type: String, required: true },
    payments:    [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
});

module.exports = mongoose.model('Project', projectSchema);