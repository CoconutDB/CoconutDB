# CoconutDB

<p align="center">
  <img src="./assest/CoconutDBnobg.png" alt="Alt text" height="300">
</p>


## About

- South Asian and Sri Lankan First NoSQL Database and document-oriented database
- Development Start: 28 November 2024
- Developers: Jehan Weerasuriya

CoconutDB is a lightweight, developer-friendly NoSQL database that stores data in JSON files — perfect for small-scale applications, experiments, or educational projects.


- 🚀 First released: 28 November 2024

- 🧹 Document-oriented & NoSQL

- ⚙️ Minimal configuration required

- 🔧 Built-in CLI to generate models

- 🌍 Designed for local file-based persistence

- 📦 Latest version: v3.0.0


## 📁 Installation

- install via node package manager (NPM)

```js

npm i coconutdb

```

## 🚀 Quick Start

1. install following NPM packages

- in your existing NodeJS app (using Expres.js)

```js

npm i joi

```

- this `joi` for validate model inputs


2. On Your NodeJS app

- create file in model folder (student.js)

```js

    const Joi = require('joi');
    const Model = require('coconutdb');

    const studentSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        enrollmentNo: Joi.string().required(),
    });

    class StudentModel extends Model {
        constructor() {
            super('students', studentSchema);
        }
    }

    module.exports = new StudentModel();


```

3. Use of Controller

- create controller called `StudentController.js` in Controller folder

```js

const studentModel = require('../model/Student');

exports.createStudent = async (req, res) => {
    try {
        const student = await studentModel.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.findAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


```

- or use can use your own approach for this

4. Creating Route

- in your NodeJS app on `routes` folder

- create file called `studentRoute.js` 

```js

    const express = require('express');
    const router = express.Router();
    const studentController = require('../controller/studentController');

    router.post('/', studentController.createStudent);
    router.get('/', studentController.getAllStudents);

    module.exports = router;


```

5. Call route in your entry file

```js

const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


```

### IMPORTANT

- if you getting errors please check the paths is correct

- - controller
- - router


# so if you need to check this use POSTMAN


## Core Features

- CoconutDB Web Alpha Version (Available for Limited time)
- still in development stage


## Releases

### v1.0.0 28 November 2024

- still in development stage

### v2.0.0 19 December 2024

- still in development stage
- Access to CoconutDB Web Alpha Verison (Available for Limited time)

### v3.0.0-beta 03 June 2025

- Currently in development
- 3rd Major Release
- Simplified Integration (Core feature of the 3rd Major Release)
- Access to CoconutDB Web Alpha Version (Previously available for a limited time) – ENDED NOW


## Developers

- Jehan Weerasuriaya
- - [LinkedIn](https://www.linkedin.com/in/jehanweerasuriya/)

