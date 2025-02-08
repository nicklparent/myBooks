const Collection = require('../models/collection');

const addToCollection = async (req, res) => {
    const { user_id, isbn_id } = req.body;
    
    try {
        const collection_id = await Collection.create({user_id, isbn_id});
        res.status(201).json({message: 'Book added to collection', collection_id});
    } catch (e) {
        res.status(500).json({message: 'Error adding to collection'})
    }
}

const getCollection = async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await Collection.findUserCollection({id});
        res.status(201).json(collection);
    } catch (e) {
        res.status(500).json({message: 'Error fetching collection ', e});
    }
}

module.exports = { addToCollection, getCollection };