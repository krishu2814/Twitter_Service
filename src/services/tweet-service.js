const { TweetRespository } = require('../repository/index')

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRespository();
    }

    async create(data) {
        const content = data.content;

        // starts with # -> hashtag
        const tags = content.match(/#[a-zA-Z0-9_]+/g).map((tag) => tag.substring(1)); // this regex extracts hashtags
        const tweet = await this.tweetRepository.create(data);
        // create hashtags and add here
        /**
         * 1. bulkcreate in mongoose -> insertMany()
         * 2. filter title of hashing based on multiple tags -> using index
         * 3. how to add tweet id inside all the hashtags
         */
        return tweet;
    }
}

module.exports = TweetService;
