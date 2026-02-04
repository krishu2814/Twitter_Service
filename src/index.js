const express = require('express');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');
// const Tweet = require('./models/tweet');
// const TweetRepository = require('./repository/tweet-repository');

const app = express();

const startServer = async function() {
    try {

        await connect();

        app.listen(PORT, async () => {
            console.log(`Server is listening at port ${PORT}.`);
            // const tweet = await Tweet.create({
            //     content: 'Forth tweet',
            //     userEMail: 'abcd@gmail.com'
            // });
            // console.log(tweet);
            // console.log(await Tweet.find());
            /*
            const tweets = await Tweet.findById('6983898b69f4aa23f8027aab');
            tweets.userEMail = 'a@gmail.com';
            await tweets.save();
            console.log(tweets);
            */
            /*
            const repo = new TweetRepository();
            const tweet = await repo.update('6983898b69f4aa23f8027aab', { content: 'No name' });
            console.log(tweet);
            */
            /*
            const repo = new TweetRepository();
            const tweet = await repo.create({ content: 'my 2nd tweet' });
            console.log(tweet);
            tweet.comments.push({ content: 'second comment' });
            await tweet.save();
            console.log(tweet);
            */
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();
