const db = require('../config/db');

class Collection{
    static async create({userId, bookId: isbn_id}){
        const [result] = await db.execute(
            'INSERT INTO collections (userid, isbn_id) VALUES (?, ?)',
            [userId, isbn_id]
        );
        return result;
    }

    static async findUserCollection(){
        const [rows] = await db.execute(
            'SELECT * FROM collection WHERE user_id = ?',
            [userId]
        );
        return rows;
    }
}