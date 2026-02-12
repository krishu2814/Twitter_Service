const Tweet = require('../models/tweet');

class TweetRepository{

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            const tweet = await Tweet.findByIdAndDelete(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(offset, limit) {
        try {

            // skip some documents and then send limited documents
            const tweet = await Tweet.find().skip(offset).limit(limit);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            const updatedTweet = await Tweet.findByIdAndUpdate(id, data, {
                new: true, // returns updated document, if not then previous one
            });
            return updatedTweet;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports =  TweetRepository;
