const { TweetRepository, HashtagRepository } = require('../repository/index')
console.log(require('../repository/index'));


class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
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
        
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags); // alreaadyb present
        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title); // title
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag)); // not present
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });
        await this.hashtagRepository.bulkCreate(newTags); // create hashtag in bulk
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }
}

module.exports = TweetService;
