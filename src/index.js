const express = require('express');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');
// const Tweet = require('./models/tweet');
const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

const app = express();

const startServer = async function() {
    try {

        await connect();

        app.listen(PORT, async () => {
            console.log(`Server is listening at port ${PORT}.`);
            
            /*
            // added comment in tweet
            const repo = new TweetRepository();
            const tweet = await repo.create({ content: 'Tweet with a comment.' });
            const comment = await Comment.create({ content: 'New comment.' });
            tweet.comments.push(comment);
            console.log(tweet);
            await tweet.save();
            console.log(tweet);
            */
            
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();
