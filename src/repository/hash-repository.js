const Hashtag = require('../models/hashtags');

class HashtagRepository {
    async create(data) {
        try {
            const hashtag = await Hashtag.create(data);
            return hashtag;
        } catch (error) {
            console.log('Something went wrong in the repository layer.')
        }
    };

    async destroy(id) { 
        try {
            const hashtag = await Hashtag.findByIdAndRemove(id);
            return hashtag;
        } catch (error) {
            console.log('Something went wrong in the repository layer.')
        }
    };

    async get(id) { 
        try {
            const hashtag = await Hashtag.findById(id);
            return hashtag;
        } catch (error) {
            console.log('Something went wrong in the repository layer.')
        }
    };

    async bulkCreate(data) { 
        try {
            const hashtag = await Hashtag.insertMany(data);
            return hashtag;
        } catch (error) {
            console.log('Something went wrong in the repository layer.')
        }
    };

    async findByName(titleList) { 
        try {
            const hashtag = await Hashtag.find({
                title: titleList, // find using specific attribute of model
            })
            return hashtag;
        } catch (error) {
            console.log('Something went wrong in the repository layer.')
        }
    };

}