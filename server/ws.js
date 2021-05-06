const ChatFactory = require('./chat-rooms/chat-factory.js');
const { initialChatRoomsCount } = require('./chat-rooms/config.json');
const generateId = require('./utils/generateId');

const initListeners = (wsServer, ws) => {
    ws.on('message', (message) => {
        try {
            const { roomName, messageBody } = JSON.parse(message);
            const parsedMessage = { id: generateId(), date: Date.now(), ...messageBody };
            const room = ChatFactory.getChatRoom(roomName);
            room.addMessage(parsedMessage);
            notifyAll(wsServer, roomName, parsedMessage);
        } catch (err) {
            console.error(err);
        }
    });
}

const notifyAll = (wsServer, roomName, message) => {
    wsServer.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({roomName, message}));
        }
    });
}

function initChatRooms() {
    new Array(initialChatRoomsCount).fill(true).map((el, index) => ChatFactory.createChatRoom(`room-${index + 1}`));
    return ChatFactory.getChatRoomsConnections();
}

module.exports = (wsServer) => {
    wsServer.on('connection', (ws) => {
        initListeners(wsServer, ws);
    });

    return initChatRooms();
}