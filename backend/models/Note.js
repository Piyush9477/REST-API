const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: {type: mongoose.Types.ObjectId, ref: "user", required: true}
});

module.exports = mongoose.model("Note", noteSchema);
