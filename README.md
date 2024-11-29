# CoconutDB

<p align="center">
  <img src="./assest/CoconutDBnobg.png" alt="Alt text" height="300">
</p>


## About

- South Asian and Sri Lankan First NoSQL Database and document-oriented database
- Development Start: 28 November 2024
- Developers: Jehan Weerasuriya


Coconut DB is an emerging NoSQL document-oriented database currently in its initial development phase. Designed to be lightweight and developer-friendly, Coconut DB aims to provide a simple yet powerful solution for handling JSON-like documents. At its core, it features a basic insert function, allowing users to add data efficiently into the database.

This early-stage database focuses on foundational functionality, with plans to expand into a full-fledged system supporting CRUD operations, advanced querying, and indexing. As development progresses, Coconut DB will incorporate features that cater to modern application needs, emphasizing ease of use and performance. Ideal for small-scale projects and experimentation, Coconut DB is the starting point of a vision to redefine simplicity in NoSQL databases.

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


## Core Features

- still in development stage

## Releases

### v1.0.0-beta1 28 November 2024

- still in development stage

## Developers

- Jehan Weerasuriaya
- - [LinkedIn](https://www.linkedin.com/in/jehanweerasuriya/)

