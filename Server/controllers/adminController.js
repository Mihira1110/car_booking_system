const User = require('../models/userModel'); 
const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user' });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

 // Adjust the path according to your project structure

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('passenger').populate('driver');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new booking
exports.createBooking = async (req, res) => {
    const { passenger, driver, pickupLocation, dropoffLocation, fare } = req.body;
    const newBooking = new Booking({ passenger, driver, pickupLocation, dropoffLocation, fare });

    try {
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: 'Error creating booking' });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: 'Error updating booking' });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        await Booking.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking' });
    }
};



// Get all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate('driver');
        console.log(trips);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new trip
exports.createTrip = async (req, res) => {
    const { driver, pickupLocation, dropoffLocation } = req.body;
    const newTrip = new Trip({ driver, pickupLocation, dropoffLocation });

    try {
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(400).json({ message: 'Error creating trip' });
    }
};

// Update a trip
exports.updateTrip = async (req, res) => {
    const { id } = req.params;

    try {
        const trip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ message: 'Error updating trip' });
    }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
    const { id } = req.params;

    try {
        await Trip.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trip' });
    }
};