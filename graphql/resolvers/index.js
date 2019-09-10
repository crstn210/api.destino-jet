const bcrypt = require('bcryptjs');

const Hotel = require('../../models/hotel');
const Room = require('../../models/room');
const Reservation = require('../../models/reservation');



const transformHotel = hotel => {
    return {
        ...hotel._doc,
        _id: hotel.id,
        rooms: rooms.bind(this, hotel._doc.rooms)
    };
};

const transformRoom = room => {
    return {
        ...room._doc,
        _id: room.id
    };
};

const transformReservation = reservation => {
    reservation.madeBy.guests.map(guest => {
        let guestQueryed = {...guest._doc, birthDate: new Date(guest._doc.birthDate).toISOString()}
        console.log(guestQueryed);
        return guestQueryed
    })
    return {
        ...reservation._doc,
        _id: reservation.id,
        dateIn: new Date(reservation._doc.dateIn).toISOString(),
        dateOut: new Date(reservation._doc.dateOut).toISOString(),
        hotel: hotel.bind(this, reservation._doc.hotel),
        room: room.bind(this, reservation._doc.room)
    };
};

const hotel = hotelId => {
    return Hotel.findById(hotelId).then(hotel => {
        return transformHotel(hotel);
    }).catch(err =>{
        throw err
    })
}

const room = roomId => {
    return Room.findById(roomId).then(room => {
        return transformRoom(room);
    }).catch(err =>{
        throw err
    })
}

const rooms = roomsIds => {
    return Room.find({_id: {$in: roomsIds}}).then(rooms => {
        return rooms.map(room => {
            return transformRoom(room);
        });
    }).catch(err => {
        throw err
    });
}

module.exports = {
    rooms: () => {
        return Room.find().then(rooms => {
            return rooms.map(room => {
                return transformRoom(room);
            })
        }).catch(err => {
            throw err
        });
    },
    hotels: () => {
        return Hotel.find().then(hotels => {
            return hotels.map(hotel => {
                return transformHotel(hotel);
            })
        }).catch(err => {
            throw err
        });
    },
    reservations: () => {
        return Reservation.find().then(reservations => {
            return reservations.map(reservation => {
                let reservationtransformed = transformReservation(reservation);
                console.log(reservationtransformed);
                return reservationtransformed;
            })
        }).catch(err => {
            throw err
        });
    },
    createHotel: args => {
        const hotel = new Hotel({
            name: args.hotelInput.name,
            description: args.hotelInput.description,
            address: args.hotelInput.address,
            city: args.hotelInput.city,
            available: args.hotelInput.available
        });
        let createHotel;
        return hotel.save()
        .then(result => {
            createHotel = transformHotel(result);
            return createHotel;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    },
    createRoom: args => {
        const room = new Room({
            number: args.roomInput.number,
            location: args.roomInput.location,
            taxes: args.roomInput.taxes,
            price: args.roomInput.price,
            type: args.roomInput.type,
            maxCapacity: args.roomInput.maxCapacity,
            available: args.roomInput.available
        });
        let createRoom;
        return room.save()
        .then(result => {
            createRoom = transformRoom(result);
            return createRoom;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    },
    createReservation: args => {
        console.log(args.reservationInput.madeBy);
        const reservation = new Reservation({
            dateIn: args.reservationInput.dateIn,
            dateOut: args.reservationInput.dateOut,
            madeBy: args.reservationInput.madeBy,
            hotel: args.reservationInput.hotel,
            room: args.reservationInput.room
        });
        let createReservation;
        return reservation.save()
        .then(result => {
            createReservation = transformReservation(result);
            return createReservation;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    },
    addRoom: args => {
        return hotel(args.hotelID).then( result => {
            let createHotel = new Hotel(result);
            createHotel.isNew = false
            createHotel.rooms = [];
            return room(args.roomID).then(result => {
                createHotel.rooms.push(result._id);
                return createHotel.save().then(result => {
                    console.log(result);
                    return transformHotel(createHotel);
                })
            })
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }
}