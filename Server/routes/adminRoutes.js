const express = require('express');
const router = express.Router();

const {getAllTrips,createTrip,updateTrip,deleteTrip,getAllBookings,createBooking,updateBooking,deleteBooking,getAllUsers,createUser,updateUser,deleteUser}= require('../controllers/adminController');

// User routes
router.get('/users',getAllUsers);
router.post('/users', createUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id', deleteUser);

// Booking routes
router.get('/bookings', getAllBookings);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id',deleteBooking);

// Trip routes
router.get('/trips', getAllTrips);
router.post('/trips', createTrip);
router.put('/trips/:id', updateTrip);
router.delete('/trips/:id',deleteTrip);

module.exports = router;
