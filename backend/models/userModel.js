
import util from 'util';

class UserModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createUser({ name, email, hashedPassword, role, department }) {
        try {
            const query = `
        INSERT INTO Users (name, email, password, role, department)
        VALUES (?, ?, ?, ?, ?)
      `;
            const params = [name, email, hashedPassword, role, department];
            const result = await this.query(query, params);
            return { success: true, userId: result.insertId };
        } catch (error) {
            console.error('Error in createUser:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserByEmail(email) {
        try {
            const query = `
        SELECT user_id, name, email, password, role, department
        FROM Users
        WHERE email = ?
      `;
            const rows = await this.query(query, [email]);
            return { success: true, user: rows[0] || null };
        } catch (error) {
            console.error('Error in getUserByEmail:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllUsers() {
        try {
            const query = `
        SELECT user_id, name, email, role, department
        FROM Users
      `;
            const rows = await this.query(query);
            return { success: true, users: rows };
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            return { success: false, error: error.message };
        }
    }

    async updateUser(userId, updates) {
        try {
            const fields = Object.keys(updates).map((field) => `${field} = ?`).join(', ');
            const params = [...Object.values(updates), userId];
            const query = `
        UPDATE Users
        SET ${fields}
        WHERE user_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateUser:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteUser(userId) {
        try {
            const query = `
        DELETE FROM Users
        WHERE user_id = ?
      `;
            const result = await this.query(query, [userId]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteUser:', error);
            return { success: false, error: error.message };
        }
    }
}

export default UserModel;
