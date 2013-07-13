var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var paymentSchema = new Schema({
    nick:     { type: String,                required: true },
    imageUrl: { type: String,                required: true, match: /^(http|https):\/\/[^ "]+$/ },
    money:    { type: Number,                required: true },
    date:     { type: Date,                  required: true },
    project:  { type: Schema.Types.ObjectId, required: true, ref: 'Project' }
});

module.exports = mongoose.model('Payment', paymentSchema);