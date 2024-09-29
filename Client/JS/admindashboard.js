// Base URL for API
const baseURL = "";

// ======================= USERS =======================

// Fetch and display all users
async function fetchUsers() {
    const response = await fetch(`${baseURL}/users`);
    const users = await response.json();
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        userTableBody.innerHTML += `
            <tr>
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openUpdateUserModal('${user._id}', '${user.name}', '${user.email}')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add a new user
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    });

    fetchUsers();
    document.getElementById('addUserForm').reset();
});

// Open modal for updating a user
function openUpdateUserModal(id, name, email) {
    document.getElementById('updateUserId').value = id;
    document.getElementById('updateUserName').value = name;
    document.getElementById('updateUserEmail').value = email;
    $('#updateUserModal').modal('show');
}

// Update user
document.getElementById('updateUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateUserId').value;
    const name = document.getElementById('updateUserName').value;
    const email = document.getElementById('updateUserEmail').value;

    await fetch(`${baseURL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    });

    fetchUsers();
    $('#updateUserModal').modal('hide');
});

// Delete a user
async function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        await fetch(`${baseURL}/users/${id}`, {
            method: 'DELETE',
        });
        fetchUsers();
    }
}

// ======================= BOOKINGS =======================

// Fetch and display all bookings
async function fetchBookings() {
    const response = await fetch(`${baseURL}/bookings`);
    const bookings = await response.json();
    const bookingTableBody = document.getElementById('bookingTableBody');
    bookingTableBody.innerHTML = '';

    bookings.forEach(booking => {
        bookingTableBody.innerHTML += `
            <tr>
                <td>${booking._id}</td>
                <td>${booking.pickupLocation}</td>
                <td>${booking.dropoffLocation}</td>
                <td>${booking.status}</td>
                <td>Rs ${booking.fare}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openUpdateBookingModal('${booking._id}', '${booking.passenger}', '${booking.pickupLocation}', '${booking.dropoffLocation}')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBooking('${booking._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add a new booking
document.getElementById('addBookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const passenger = document.getElementById('bookingPassenger').value;
    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropoffLocation = document.getElementById('dropoffLocation').value;

    await fetch(`${baseURL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passenger, pickupLocation, dropoffLocation }),
    });

    fetchBookings();
    document.getElementById('addBookingForm').reset();
});

// Open modal for updating a booking
function openUpdateBookingModal(id, passenger, pickupLocation, dropoffLocation) {
    document.getElementById('updateBookingId').value = id;
    document.getElementById('updateBookingPassenger').value = passenger;
    document.getElementById('updatePickupLocation').value = pickupLocation;
    document.getElementById('updateDropoffLocation').value = dropoffLocation;
    $('#updateBookingModal').modal('show');
}

// Update booking
document.getElementById('updateBookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateBookingId').value;
    const passenger = document.getElementById('updateBookingPassenger').value;
    const pickupLocation = document.getElementById('updatePickupLocation').value;
    const dropoffLocation = document.getElementById('updateDropoffLocation').value;

    await fetch(`${baseURL}/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passenger, pickupLocation, dropoffLocation }),
    });

    fetchBookings();
    $('#updateBookingModal').modal('hide');
});

// Delete a booking
async function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        await fetch(`${baseURL}/bookings/${id}`, {
            method: 'DELETE',
        });
        fetchBookings();
    }
}

// ======================= TRIPS =======================

// Fetch and display all trips
async function fetchTrips() {
    const response = await fetch(`${baseURL}/trips`);
    const trips = await response.json();
    const tripTableBody = document.getElementById('tripTableBody');
    tripTableBody.innerHTML = '';

    trips.forEach(trip => {
        tripTableBody.innerHTML += `
            <tr>
                <td>${trip._id}</td>
                <td>${trip.driver}</td>
                <td>${trip.pickupLocation}</td>
                <td>${trip.dropoffLocation}</td>
                <td>${trip.status}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openUpdateTripModal('${trip._id}', '${trip.driver}', '${trip.pickupLocation}', '${trip.dropoffLocation}')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTrip('${trip._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add a new trip
document.getElementById('addTripForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const driver = document.getElementById('tripDriver').value;
    const pickupLocation = document.getElementById('tripPickupLocation').value;
    const dropoffLocation = document.getElementById('tripDropoffLocation').value;

    await fetch(`${baseURL}/trips`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driver, pickupLocation, dropoffLocation }),
    });

    fetchTrips();
    document.getElementById('addTripForm').reset();
});

// Open modal for updating a trip
function openUpdateTripModal(id, driver, pickupLocation, dropoffLocation) {
    document.getElementById('updateTripId').value = id;
    document.getElementById('updateTripDriver').value = driver;
    document.getElementById('updateTripPickupLocation').value = pickupLocation;
    document.getElementById('updateTripDropoffLocation').value = dropoffLocation;
    $('#updateTripModal').modal('show');
}

// Update trip
document.getElementById('updateTripForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateTripId').value;
    const driver = document.getElementById('updateTripDriver').value;
    const pickupLocation = document.getElementById('updateTripPickupLocation').value;
    const dropoffLocation = document.getElementById('updateTripDropoffLocation').value;

    await fetch(`${baseURL}/trips/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driver, pickupLocation, dropoffLocation }),
    });

    fetchTrips();
    $('#updateTripModal').modal('hide');
});

// Delete a trip
async function deleteTrip(id) {
    if (confirm('Are you sure you want to delete this trip?')) {
        await fetch(`${baseURL}/trips/${id}`, {
            method: 'DELETE',
        });
        fetchTrips();
    }
}

// Initial fetch of all data
fetchUsers();
fetchBookings();
fetchTrips();
