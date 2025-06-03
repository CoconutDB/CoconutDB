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


## How to use

- install via node package manager (NPM)

```js

npm i coconutdb

```

- run following command

```js

npx create-model

```

- then enter name that you need to create model

- after doing it in server folder you can see `models` 
- in `models` create a file with you entered name 
- - eg: User.js

- example file for `user` model

```js

const Database = require('coconutdb/src/database'); 
    
class userModel {
    constructor() {
       this.collectionName = 'user';
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
    
module.exports = new userModel();
    
```

### use in Controller (Nodejs + ExpressJS + MVC)

- in `controller/UserController.js`

```js

const UserModel = require("../models/User");

const UserController = {
    CreateUser: async (req, res) => {
        try{
            console.log(req.body)

            const NewUser = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            })

            // const NewUser = await UserModel.create(req.body)

            if(NewUser){
                return res.json({ Status: "Success"})
            }
            else{
                return res.json({ Error: "Internal Server Error"})
            }
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = UserController;


```
- using React + Vite + TailwindCSS as Frontend

<hr>

## To use CoconutDB Web

### How to use with CoconutDB Web

- Access to CoconutDB Web v1.0.0-alpha Verison using link

[CoconutDB Alpha Version](https://coconutdbweb.vercel.app/)

<b>Important : </b> this web version is Available for limited time

- You must do following things to do for access CoconutDB web Version

- - Update User entry file on Backend Server  (server.js/index.js/app.js)
- - Default entry file

```js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const UserRoute = require('./route/UserRoute')
const ProductRoute = require('./route/ProductRoute')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', UserRoute)
app.use('/product', ProductRoute)

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

- - adding following lines 

```js

const DBRoute = require('./route/DBRoute') 
app.use('/config', DBRoute)


```

- - Updated entry file

```js

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const UserRoute = require('./route/UserRoute')
const DBRoute = require('./route/DBRoute') // newly added line
const ProductRoute = require('./route/ProductRoute')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', UserRoute)
app.use('/product', ProductRoute) // newly added line
app.use('/config', DBRoute)

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

- After done this 
- - Create file in route folder called `DBRoute.js`
- - and copy following content and past there

```js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/dbconfig', async (req, res) => {
    try{
        const dataDir = path.join(__dirname, '../data');

        fs.readdir(dataDir, (err, files) => {
            if (err) {
              res.status(500).json({ error: 'Error reading the data folder' });
              return;
            }
            const jsonFiles = files.filter(file => file.endsWith('.json'));
            res.json(jsonFiles);
        });
    }
    catch(err){
        console.log(err)
    }
})


router.get('/documents/:file', async (req, res) => {
    try{
        const { file } = req.params;
        const filePath = path.join(__dirname, '../data', file); 
      
        if (fs.existsSync(filePath)) {
          res.sendFile(filePath);
        } else {
          res.status(404).json({ error: 'File not found' });
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;

```

<hr>

## Core Features

- CoconutDB Web Alpha Version (Available for Limited time)
- still in development stage


## Releases

### v1.0.0 28 November 2024

- still in development stage

### v2.0.0-beta1 19 December 2024

- still in development stage
- Access to CoconutDB Web Alpha Verison (Available for Limited time)

## Developers

- Jehan Weerasuriaya
- - [LinkedIn](https://www.linkedin.com/in/jehanweerasuriya/)

