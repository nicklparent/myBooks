const db = require('../config/db');

class User{
    static async create({username, email, password}){
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        return result.insertId;
    }
    static async findByEmail({email}){
        const [row] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return row[0];
    }

    static async findByUsername({username}){
        const [row] = await db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return row[0];
    }
}

module.exports = User;