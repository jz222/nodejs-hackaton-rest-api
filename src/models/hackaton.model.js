const mongoose = require('mongoose');

const { hackatonStatus } = require('../utils/etalons.util');

const participantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        solution: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const textBlockSchema = new mongoose.Schema(
    {
        title: String,
        text: String,
        images: [String]
    },
    { _id: false }
);

const hackatonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: hackatonStatus,
            default: 'created'
        },
        textBlocks: [textBlockSchema],
        participants: [participantSchema]
    },
    { timestamps: true }
);

module.exports = hackatonSchema;
