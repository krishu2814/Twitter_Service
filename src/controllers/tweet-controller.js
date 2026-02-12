const { TweetService } = require('../services/index');

class TweetController {
    constructor() {
        this.tweetService = new TweetService();
        this.createTweet = this.createTweet.bind(this);
    }

    async createTweet(req, res) {
        try {
            const response = await this.tweetService.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Successfully created the tweet.",
                data: response,
                err: {},
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong in the controllers.",
                data: {},
                err: error,
            })
        }
    };

}

module.exports = new TweetController();