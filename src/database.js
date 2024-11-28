const { v4: uuidv4 } = require('uuid');
const Storage = require('./storage');

class Database {
  static async create(collection, document) {
    const data = await Storage.readFile(collection);
    const newDoc = { ...document, _id: uuidv4() };
    data.push(newDoc);
    await Storage.writeFile(collection, data);
    return newDoc;
  }

  static async findAll(collection) {
    return await Storage.readFile(collection);
  }

  static async findById(collection, id) {
    const data = await Storage.readFile(collection);
    return data.find(doc => doc._id === id);
  }

  static async updateById(collection, id, updates) {
    const data = await Storage.readFile(collection);
    const index = data.findIndex(doc => doc._id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      await Storage.writeFile(collection, data);
      return data[index];
    }
    return null;
  }

  static async deleteById(collection, id) {
    const data = await Storage.readFile(collection);
    const newData = data.filter(doc => doc._id !== id);
    await Storage.writeFile(collection, newData);
    return data.length !== newData.length;
  }
}

module.exports = Database;
