const ChatRoom = require('./chat-room.js');

module.exports = class ChatFactory {
    static chatRooms = new Map();
    
    static createChatRoom(name) {
        const chatRoom = new ChatRoom(name)
        this.chatRooms.set(name, chatRoom);
    }

    static getChatRoomsConnections() {
        return Array.from(this.chatRooms, ([name]) => name);
    }

    static getChatRoom(name) {
        return this.chatRooms.get(name);
    }
}