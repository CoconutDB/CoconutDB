const fs = require('fs-extra');
const path = require('path');

class Storage {
  static baseDir = path.join(process.cwd(), 'data'); // Default data directory

  static ensureDirectory() {
    fs.ensureDirSync(this.baseDir);
  }

  static getFilePath(collection) {
    this.ensureDirectory();
    return path.join(this.baseDir, `${collection}.json`);
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
}

module.exports = Storage;
