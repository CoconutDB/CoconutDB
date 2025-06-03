const fs = require('fs-extra');
const path = require('path');

let config = [];

try {
    config = require(path.join(process.cwd(), 'coconut.config.json'));
} catch {}

class Storage {
    static baseUrl = path.join(process.cwd(), config.dataDir || 'data');

    static ensureDirectory() {
        fs.ensureDirSync(this.baseUrl);
    }

    static getFilePath(collection) {
        this.ensureDirectory();
        return path.join(this.baseUrl, `${collection}.json`);
    }

    static async readFile(collection) {
        const filePath = this.getFilePath(collection);

        if (await fs.pathExists(filePath)) {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    static async writeFile(collection, data) {
        const filePath = this.getFilePath(collection);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    static async createFile(collection, document) {
        const filePath = this.getFilePath(collection);
        await fs.writeFile(filePath, JSON.stringify([document], null, 2), 'utf-8');
    }
}

module.exports = Storage;
