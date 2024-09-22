const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['passenger', 'driver', 'operator','admin']
    }
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Pre-save hook to format the phone number
userSchema.pre('save', function(next) {
    if (this.phone && !this.phone.startsWith('+94')) {
        this.phone = `+94${this.phone.replace(/^0/, '')}`; // Remove leading 0 if present
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
