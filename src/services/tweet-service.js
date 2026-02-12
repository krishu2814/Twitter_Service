const { TweetRepository, HashtagRepository } = require('../repository/index');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content || "";

        // Extract hashtags
        let tags = content.match(/#[a-zA-Z0-9_]+/g) || [];

        // normalize + remove duplicates
        tags = [...new Set(
            tags.map(tag => tag.substring(1).toLowerCase())
        )];

        // create tweet
        const tweet = await this.tweetRepository.create(data);

        if (!tags.length) return tweet;

        // find existing hashtags
        const alreadyPresentTags =
            await this.hashtagRepository.findByName(tags);

        const presentTitles =
            alreadyPresentTags.map(tag => tag.title);

        // new hashtags
        const newTagsData = tags
            .filter(tag => !presentTitles.includes(tag))
            .map(tag => ({
                title: tag,
                tweets: [tweet._id]
            }));

        let createdTags = [];
        if (newTagsData.length) {
            createdTags =
                await this.hashtagRepository.bulkCreate(newTagsData);
        }

        // update existing hashtags safely
        await Promise.all(
            alreadyPresentTags.map(tag =>
                this.hashtagRepository.addTweetToTag(
                    tag._id,
                    tweet._id
                )
            )
        );

        // add hashtag refs to tweet
        const allTags = [
            ...alreadyPresentTags,
            ...createdTags
        ];

        tweet.hashtags = allTags.map(tag => tag._id);
        await tweet.save();

        return tweet;
    }
}

module.exports = TweetService;
