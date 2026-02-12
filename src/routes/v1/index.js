const express = require('express');

const router = express.Router();
const { TweetController } = require('../../controllers/index');

router.post('/tweet/create', TweetController.createTweet);

module.exports = router;
