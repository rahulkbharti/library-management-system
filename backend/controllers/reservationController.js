import ReservationsModel from '../models/reservationModel.js';
import db from '../config/db.js';

const reservationsModel = new ReservationsModel(db);

export default class ReservationsController {
    static async createReservation(req, res) {
        const { user_id, book_id } = req.body;

        try {
            const result = await reservationsModel.createReservation({ user_id, book_id });

            if (result.success) {
                return res.status(201).json({ message: 'Reservation created successfully', reservationId: result.reservationId });
            }

            res.status(500).json({ message: 'Failed to create reservation', error: result.error });
        } catch (error) {
            console.error('Error in createReservation:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllReservations(req, res) {
        try {
            const result = await reservationsModel.getAllReservations();

            if (result.success) {
                return res.status(200).json(result.reservations);
            }

            res.status(500).json({ message: 'Failed to fetch reservations', error: result.error });
        } catch (error) {
            console.error('Error in getAllReservations:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getReservationsByUser(req, res) {
        const { user_id } = req.params;

        try {
            const result = await reservationsModel.getReservationsByUser(user_id);

            if (result.success) {
                return res.status(200).json(result.reservations);
            }

            res.status(500).json({ message: 'Failed to fetch reservations for the user', error: result.error });
        } catch (error) {
            console.error('Error in getReservationsByUser:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateReservation(req, res) {
        const { reservation_id } = req.params;
        const updates = req.body;

        try {
            const result = await reservationsModel.updateReservation(reservation_id, updates);

            if (result.success) {
                return res.status(200).json({ message: 'Reservation updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update reservation', error: result.error });
        } catch (error) {
            console.error('Error in updateReservation:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteReservation(req, res) {
        const { reservation_id } = req.params;

        try {
            const result = await reservationsModel.deleteReservation(reservation_id);

            if (result.success) {
                return res.status(200).json({ message: 'Reservation deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete reservation', error: result.error });
        } catch (error) {
            console.error('Error in deleteReservation:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
