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
    comments: [
        {
            content: {
                type: String,
                required: true,
            }
        }
    ]
},  {timestamps: true});

// automatically Pluralised collection name -> Tweets
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

/**
 * Schema -> Blueprint
 * Model -> will connect to database and fetch data
 */
