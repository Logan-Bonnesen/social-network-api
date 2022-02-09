const moment = require('moment');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const moment = require('moment')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter will adjust to human readable date/timestamp
            get: (createdAt) => moment(createdAt).format('LLL')
        },
        username: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: { virtuals: true },
        id: false,
    }
);

const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

module.exports = Thought