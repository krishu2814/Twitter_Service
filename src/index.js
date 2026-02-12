const express = require('express');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/database');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

const startServer = async function() {
    try {
        app.listen(PORT, async () => {
            console.log(`Server is listening at port ${PORT}.`);
            await connect();
            
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();
