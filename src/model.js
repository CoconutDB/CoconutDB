const Database = require('./database');
const Joi = require('joi');
const Storage = require('./storage');
const fs = require('fs-extra');

class Model {
    constructor(collectionName, schema = null) {
        this.collectionName = collectionName;
        this.schema = schema;
    }

    validate(document) {
        if (!this.schema) return { value: document };
        const { error, value } = this.schema.validate(document, { stripUnknown: true });
        if (error) throw new Error(`Validation failed: ${error.message}`);
        return { value };
    }

    async create(document) {
        const { value } = this.validate(document);

        // Check if the file exists for this collection
        const filePath = Storage.getFilePath(this.collectionName);
        const fileExists = await fs.pathExists(filePath);

        // If file doesn't exist, create it
        if (!fileExists) {
            await Storage.createFile(this.collectionName, value);
        } else {
            // Otherwise, write to the existing file
            const existingData = await Storage.readFile(this.collectionName);
            existingData.push(value);
            await Storage.writeFile(this.collectionName, existingData);
        }

        return value;
    }

    async findAll() {
        return await Database.findAll(this.collectionName);
    }

    async findById(id) {
        return await Database.findById(this.collectionName, id);
    }

    async updateById(id, updates) {
        const { value } = this.validate(updates);
        return await Database.updateById(this.collectionName, id, value);
    }

    async deleteById(id) {
        return await Database.deleteById(this.collectionName, id);
    }
}

module.exports = Model;
