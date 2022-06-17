const knex = require('knex');
const uuidv4 = require('uuid').v4;
const { config } = require('../dataBase/sqlite3/config');
class Chat {
  constructor() {
    this.nameTable = 'MESSAGES';
    this.database = knex(config);
  }
  async saveMessage(message) {
    try {
      if (!message || typeof message !== 'object') {
        throw Error('Data invalid');
      }
      if (Object.keys(message).length === 0) {
        throw Error("Data empty");
      }
      const newMessage = {
        id: uuidv4(),
        ...message,
      };
      await this.database.from(this.nameTable).insert(newMessage);
      return newMessage;
    } catch (error) {
      throw Error(error.message);
    }
  }
  async getAllMessages() {
    try {
      const data = await this.database.from(this.nameTable).select('*');
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Chat;
