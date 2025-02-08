const db = require('../config/db');

class Collection{
    static async create({user_id, isbn_id}){
        const [result] = await db.execute(
            'INSERT INTO collections (user_id, isbn_id) VALUES (?, ?)',
            [user_id, isbn_id]
        );
        return result;
    }

    static async findUserCollection(user_id){
        const [rows] = await db.execute(
            'SELECT * FROM collection WHERE user_id = ?',
            [userId]
        );
        return rows;
    }
}

module.exports = Collection;