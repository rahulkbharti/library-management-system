import express from 'express';
import ReservationsController from '../controllers/reservationController.js';

const router = express.Router();

// Routes for reservations
router.post('/', ReservationsController.createReservation);
router.get('/', ReservationsController.getAllReservations);
router.get('/user/:user_id', ReservationsController.getReservationsByUser);
router.put('/:reservation_id', ReservationsController.updateReservation);
router.delete('/:reservation_id', ReservationsController.deleteReservation);

export default router;
