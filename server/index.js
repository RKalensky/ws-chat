const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const cors = require('cors');
const getChatRooms = require('./ws.js');
const ChatFactory = require('./chat-rooms/chat-factory.js');

require('dotenv').config();

const SUCCESS_STATUS_CODE = 200;
const NOT_FOUND_STATUS_CODE = 404;

app.use(cors());
app.use(express.json());

const wsServer = new WebSocket.Server({ server: http });
const chatRooms = getChatRooms(wsServer);

app.get('/api/chat-rooms', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json({
        message: 'Chat rooms are reciewed successfully',
        chatRooms
    })
});

app.get('/api/chat-room/:id', ({ params: { id }, body: { date } }, res) => {
    const chatRoom = ChatFactory.getChatRoom(id);

    if (chatRoom) {
        res.status(SUCCESS_STATUS_CODE).json({
            message: 'Chat rooms are reciewed successfully',
            chatMessages: chatRoom.getMessages(date)
        });
    } else {
        res.status(NOT_FOUND_STATUS_CODE).json({
            message: `Chat room with with id ${id} isn\'t found`,
        });
    }
});

app.use('*', (req, res) => {
    res.status(NOT_FOUND_STATUS_CODE).send({
        message: 'Page Not Found',
    });
});

http.listen(process.env.PORT, () => {
    console.log('listening on 5000');
});