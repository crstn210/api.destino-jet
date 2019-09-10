const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Hotel {
        _id: ID!
        name: String!
        description: String!
        address: String!
        city: String!
        available: Boolean!
        rooms: [Room!]!
    }

    type Room {
        _id: ID!
        number: String!
        location: String!
        taxes: Float!
        price: Float!
        type: String!
        maxCapacity: Int!
        available: Boolean!
    }

    type Reservation {
        _id: ID!
        dateIn: String!
        dateOut: String!
        madeBy: MadeBy!
        hotel: Hotel!
        room: Room!
    }

    type Gest {
        firstName: String!
        lastName: String!
        birthDate: String!
        gender: String!
        docType: String!
        docNumber: String!
        email: String!
        phone: String!
    }

    type EmergencyContact {
        name: String!
        phone: String!
    }

    type MadeBy {
        guests: [Gest!]!
        emergencyContact: EmergencyContact!
    }

    input GestInput {
        firstName: String!
        lastName: String!
        birthDate: String!
        gender: String!
        docType: String!
        docNumber: String!
        email: String!
        phone: String!
    }

    input EmergencyContactInput {
        name: String!
        phone: String!
    }

    input MadeByInput {
        guests: [GestInput!]!
        emergencyContact: EmergencyContactInput!
    }

    input HotelInput {
        name: String!
        description: String!
        address: String!
        city: String!
        available: Boolean!
    }

    input RoomInput {
        number: String!
        location: String!
        taxes: Float!
        price: Float!
        type: String!
        maxCapacity: Int!
        available: Boolean!
    }

    input ReservationInput {
        dateIn: String!
        dateOut: String!
        madeBy: MadeByInput!
        hotel: ID!
        room: ID!
    }

    type RootQuery {
        hotels: [Hotel!]!
        rooms: [Room!]!
        reservations: [Reservation!]!
    }

    type RootMutation {
        createHotel(hotelInput: HotelInput): Hotel
        createRoom(roomInput: RoomInput): Room
        createReservation(reservationInput: ReservationInput): Reservation
        addRoom(hotelID: ID, roomID: ID): Hotel
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)