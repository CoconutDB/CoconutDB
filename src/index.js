#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

async function createModel() {
    const modelDir = `./models`;

    // Ensure the models directory exists
    fs.ensureDirSync(modelDir);

    const { modelName } = await inquirer.prompt([
        { type: "input", name: "modelName", message: "Enter the model name:" },
    ]);

    const modelFilePath = path.join(modelDir, `${modelName}.js`);

    // Check if the model already exists
    if (fs.existsSync(modelFilePath)) {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: `Model "${modelName}" already exists. What would you like to do?`,
                choices: [
                    { name: "Overwrite the existing model", value: "overwrite" },
                    { name: "Cancel", value: "cancel" },
                ],
            },
        ]);

        if (action === "cancel") {
            console.log(`Action canceled. No changes made.`);
            return;
        }
    }

    const modelContent = `
const Database = require('coconutdb/src/database'); 
    
class ${modelName}Model {
    constructor() {
       this.collectionName = '${modelName.toLowerCase()}';
    }
    
    async create(document) {
       return await Database.create(this.collectionName, document);
    }
    
    async findAll() {
       return await Database.findAll(this.collectionName);
    }
    
    async findById(id) {
       return await Database.findById(this.collectionName, id);
    }
    
    async updateById(id, updates) {
       return await Database.updateById(this.collectionName, id, updates);
    }
    
    async deleteById(id) {
       return await Database.deleteById(this.collectionName, id);
    }
}
    
    module.exports = new ${modelName}Model();
    `;

    // Write the model file
    fs.writeFileSync(modelFilePath, modelContent);
    console.log(`Model "${modelName}" created successfully at ${modelFilePath}!`);
}

async function main() {
    await createModel();
}

main();
