const express = require('express');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');
const HashtagRepository = require('./repository/hash-repository');
const TweetService = require('./services/tweet-service');


const app = express();

const startServer = async function() {
    try {
        // databse connection
        await connect();
        const service = new TweetService();

        app.listen(PORT, async () => {
            console.log(`Server is listening at port ${PORT}.`);
            const tweet = await service.create({
                content: "Quality insights as always. This is a game changer for the industry! 🚀 #Innovation #BusinessGrowth #Networking"
            });
            console.log(tweet);
            
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();
