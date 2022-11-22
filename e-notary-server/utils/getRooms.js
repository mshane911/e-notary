var rooms = {}

function getRooms(io) {
    var availableRooms = [];
    var rooms = io.sockets.adapter.rooms;
    for (let [key, value] of rooms) {
        if (!(Array.from(value.values()) == key)) {
            availableRooms.push(key);
        }
    }
    return availableRooms;
}

module.exports = { getRooms, rooms }