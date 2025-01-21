import util from 'util';

class ReservationsModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createReservation({ user_id, book_id }) {
        try {
            const query = `
        INSERT INTO Reservations (user_id, book_id)
        VALUES (?, ?)
      `;
            const result = await this.query(query, [user_id, book_id]);
            return { success: true, reservationId: result.insertId };
        } catch (error) {
            console.error('Error in createReservation:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllReservations() {
        try {
            const query = `
        SELECT r.reservation_id, r.user_id, u.name AS user_name, r.book_id, b.title AS book_title,
               r.reserved_at, r.status
        FROM Reservations r
        INNER JOIN Users u ON r.user_id = u.user_id
        INNER JOIN Books b ON r.book_id = b.book_id
      `;
            const rows = await this.query(query);
            return { success: true, reservations: rows };
        } catch (error) {
            console.error('Error in getAllReservations:', error);
            return { success: false, error: error.message };
        }
    }

    async getReservationsByUser(user_id) {
        try {
            const query = `
        SELECT r.reservation_id, r.user_id, u.name AS user_name, r.book_id, b.title AS book_title,
               r.reserved_at, r.status
        FROM Reservations r
        INNER JOIN Users u ON r.user_id = u.user_id
        INNER JOIN Books b ON r.book_id = b.book_id
        WHERE r.user_id = ?
      `;
            const rows = await this.query(query, [user_id]);
            return { success: true, reservations: rows };
        } catch (error) {
            console.error('Error in getReservationsByUser:', error);
            return { success: false, error: error.message };
        }
    }

    async updateReservation(reservation_id, updates) {
        try {
            const fields = [];
            const params = [];

            for (const [key, value] of Object.entries(updates)) {
                fields.push(`${key} = ?`);
                params.push(value);
            }

            params.push(reservation_id);

            const query = `
        UPDATE Reservations
        SET ${fields.join(', ')}
        WHERE reservation_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateReservation:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteReservation(reservation_id) {
        try {
            const query = `
        DELETE FROM Reservations
        WHERE reservation_id = ?
      `;
            const result = await this.query(query, [reservation_id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteReservation:', error);
            return { success: false, error: error.message };
        }
    }
}

export default ReservationsModel;
