const fs = require('fs-extra');
const path = require('path');
const yargs = require('yargs');

// Define the location to save the model files (this could be within a 'models' directory)
const modelsDir = path.join(process.cwd(), 'models');

// Ensure the models directory exists
fs.ensureDirSync(modelsDir);

// Function to create the model
const createModel = (modelName) => {
  if (!modelName) {
    console.error("Please provide a model name.");
    process.exit(1);
  }

  // Define the model file path
  const modelFilePath = path.join(modelsDir, `${modelName}.js`);

  // Check if the file already exists
  if (fs.existsSync(modelFilePath)) {
    console.log(`Model "${modelName}" already exists.`);
    return;
  }

  // Create the model file content
  const modelContent = `
const Database = require('../database/database');

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

  // Write the model content to a file
  fs.writeFileSync(modelFilePath, modelContent, 'utf-8');

  console.log(`Model "${modelName}" has been created at ${modelFilePath}`);
};

// Parse command line arguments using yargs
yargs.command(
  'Modelcreate <modelName>',
  'Create a new model',
  (yargs) => {
    yargs.positional('modelName', {
      describe: 'The name of the model to create',
      type: 'string',
    });
  },
  (argv) => {
    createModel(argv.modelName);
  }
);

// Parse the command-line input
yargs.parse();
