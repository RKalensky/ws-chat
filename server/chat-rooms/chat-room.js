
const { newestMessagesCount } = require('./config.json');
const fs = require('fs');

module.exports = class ChatRoom {
    constructor(name) {
        this.name = name;
        this.initMessages();
    }

    async initMessages() {
        try {
            const messages = await this.readDataFromFile()
            this.messages = messages[this.name] || [];
        } catch (err) {
            throw new Error(err);
        }
    }

    async saveToFile(message) {
        const data = await this.readDataFromFile();
        // save only 10 last messages
        const roomCollection = [ ...(data[this.name] || []), message ].slice(newestMessagesCount * -1);

        fs.writeFile('chat-rooms/messages.json', JSON.stringify({ ...data, [this.name]: roomCollection }, null, 2), (err) => {
                if (err) throw new Error(err);
            }
        );
    }

    readDataFromFile() {
        return new Promise((res, rej) => {
            fs.readFile('chat-rooms/messages.json', 'utf8', (err, data) => {
                if (err) rej(err);
                res(JSON.parse(data));
            });
        });
    }

    addMessage(message) {
        this.messages.push(message);
        this.saveToFile(message);
    }

    getMessagesFromPeriod(date) {
        const targetIndex = this.messages.findIndex(item => item.date > date);
        return this.messages.slice(targetIndex);
    }

    getNewestMessages() {
        return this.messages.slice(newestMessagesCount * -1);
    }

    getMessages(date) {
        return date ? this.getMessagesFromPeriod(date) : this.getNewestMessages();
    }
}