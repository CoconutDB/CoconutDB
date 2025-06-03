const { v4: uuidv4 } = require('uuid');
const Storage = require('./storage');
const fs = require('fs-extra');

class Database {
    // Create a new document with a unique _id and save it
    static async create(collection, document) {
        const data = await Storage.readFile(collection);
        const newDoc = { ...document, _id: uuidv4() };
        data.push(newDoc);
        await Storage.writeFile(collection, data);
        return newDoc;
    }

    // Return all documents in a collection
    static async findAll(collection) {
        return await Storage.readFile(collection);
    }

    // Find a document by _id
    static async findById(collection, id) {
        const data = await Storage.readFile(collection);
        return data.find(doc => doc._id === id) || null;
    }

    // Update a document by _id with new values
    static async updateById(collection, id, updates) {
        const data = await Storage.readFile(collection);
        const index = data.findIndex(doc => doc._id === id);
        if (index === -1) return null;

        data[index] = { ...data[index], ...updates };
        await Storage.writeFile(collection, data);
        return data[index];
    }

    // Delete a document by _id
    static async deleteById(collection, id) {
        const data = await Storage.readFile(collection);
        const filteredData = data.filter(doc => doc._id !== id);
        if (filteredData.length === data.length) return false;

        await Storage.writeFile(collection, filteredData);
        return true;
    }
}

module.exports = Database;
