const User = require('../models/userModel');
const Driver = require('../models/driverModel')
const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');

const { Vonage } = require('@vonage/server-sdk');

// Initialize Vonage with your API credentials
const vonage = new Vonage({
    apiKey: "23c94fa8", // Replace with your actual Vonage API key
    apiSecret: "JJNy8eBGs9Ct7Q4o" // Replace with your actual Vonage API secret
});

// Helper function to send SMS
const sendSMS = (to, text) => {
    return new Promise((resolve, reject) => {
        vonage.sms.send(
            {
                to, // Passenger's phone number
                from: "Vonage APIs", // Replace with a valid phone number if needed
                text
            },
            (error, responseData) => {
                if (error) {
                    return reject(error); // Reject with error
                }
                if (responseData.messages[0].status === "0") {
                    resolve(responseData); // Resolve successfully
                } else {
                    reject(new Error(responseData.messages[0]['error-text'])); // Reject with error text
                }
            }
        );
    });
};

// Create a new booking
exports.createBooking = async (req, res) => {
    const { passengerId, driverId, pickupLocation, dropoffLocation, fare, date } = req.body;

   

    try {
        // Create a new booking object
        const newBooking = new Booking({
            passenger: passengerId,
            driver: driverId,
            pickupLocation,
            dropoffLocation,
            fare,
            date,
            status: 'active',
        });

        // Save the new booking to the database
        await newBooking.save();

        const user = await User.findById({_id:passengerId});
        // Prepare SMS message
        const smsText = `Your booking (${driverId}) from ${pickupLocation} to ${dropoffLocation} has been confirmed! - City Taxi`;
          
        const phoneNumber = user.phone;

        console.log(phoneNumber);
        // Send SMS to the passenger
        await sendSMS(phoneNumber, smsText);

        // Return a successful response
        res.json({ success: true, booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking or send SMS' });
    }
};

// Fetch passenger profile by passengerId
exports.getPassengerProfile = async (req, res) => {
    const { passengerId } = req.params; // Extract passengerId from route params

    try {
        const passenger = await User.findById(passengerId);
        if (!passenger) {
            return res.status(404).json({ success: false, message: 'Passenger not found' });
        }
        res.json({ success: true, passenger });
    } catch (error) {
        console.error('Error fetching passenger profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};




// Fetch active bookings for a passenger by passengerId
exports.getPassengerBookings = async (req, res) => {
    const { passengerId } = req.params;

    try {
        const bookings = await Booking.find({ passenger: passengerId, status: 'active' });
        res.json({ success: true, bookings });
        console.log(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Fetch passenger trip history by passengerId
exports.getPassengerTripHistory = async (req, res) => {
    const { passengerId } = req.params;

    try {
        const history = await Trip.find({ passenger: passengerId }).sort({ date: -1 });
        res.json({ success: true, history });
    } catch (error) {
        console.error('Error fetching trip history:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Cancel a booking by bookingId
exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.status = 'canceled'; // Update booking status
        await booking.save();

        res.json({ success: true, message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// delete a Trip History by TripId
exports.deleteBooking = async (req, res) => {
    const { passengerId } = req.params;

    try {
        const booking = await Booking.findById(passengerId);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        await booking.deleteOne({passenger:passengerId});

        res.json({ success: true, message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Controller function to get drivers within a radius
exports.getClosestDrivers = async (req, res) => {
    const { lat, lng, radius  } = req.query; // radius in meters (default 100km)
    try {
        // MongoDB's $near operator for geospatial queries
        const drivers = await Driver.find({
            availability: 'available',
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat] // [longitude, latitude]
                    },
                    $maxDistance: radius  // Max distance in meters
                }
            }
        });

        res.json({ success: true, drivers });
    } catch (error) {
        console.error('Error fetching closest drivers:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
