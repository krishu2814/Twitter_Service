const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    // if not required -> not present in DB if not sent by User
    userEMail: {
        type: String,
    },
    // name and id of model -> using type and ref
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true });

// does not persist in database
tweetSchema.virtual('contentWithEmail').get(function process() {
    return `${this.content} \nCreated by: ${this.userEmail}`;
});

// hooks
tweetSchema.pre('save', function (next) {
    this.content = this.content + '....';
    next();
});

// automatically Pluralised collection name -> Tweets
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

/**
 * Schema -> Blueprint
 * Model -> will connect to database and fetch data
 */
