const express = require('express');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');

const app = express();

const startServer = async function() {
    try {
        await connect();

        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}.`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();


