const express = require('express');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');
const HashtagRepository = require('./repository/hash-repository');

const app = express();

const startServer = async function() {
    try {
        // databse connection
        await connect();
        const hash = new HashtagRepository();

        app.listen(PORT, async () => {
            console.log(`Server is listening at port ${PORT}.`);
            
            let repo = await hash.bulkCreate([
                { title: 'Anmol', tweets: [] },
                { title: 'Sakshi', tweets: [] },
                { title: 'Krishu', tweets: [] },
                { title: 'Swasti', tweets: [] }
            ]);

            // console.log(repo);
            
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();
