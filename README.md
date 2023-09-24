# Thrifty

This project is a team project in my Software Engineering course. We decided to make Thrifty, which is a web app for buying and selling second-hand items related to fashion (clothes, shoes, etc. We 
created Thrifty because we saw a problem where buying and selling second-hand fashion items in general still relies on social media and general marketplaces so that there is a lack of a convenient 
and reliable way to buy and sell second-hand fashion items. 

We researched various websites and social media that are used to buy and sell second-hand items and distributed google forms to meet 
feature requirements. After creating use cases and activity diagrams, we started development by making a prototype design using Figma. Then, we implement it into code using HTML, CSS, 
JavaScript, EJS (Embedded JavaScript), and Bootstrap for User Interface. For the back end, we use Express.js and integrate it with MongoDB (NoSQL Database) using Mongoose. 

We also use 
packages on NPM and dependencies such as Passport for user authentication and authorization. In our model, there are several objects like User, Item, etc. We limit the features that can only be 
accessed by users with certain roles, namely buyers and sellers. The architectural style we use is REST. We provide an easy-to-use user interface and a good rating and review system.

## How to Install

1. Install [NodeJS](https://nodejs.org/en/download).
2. Install [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) and for Windows users install [mongosh](https://www.mongodb.com/docs/mongodb-shell/install/) too.
4. Clone this repository.
5. Open command prompt in the cloned directory (where **package.json** is located) and run `npm install`.
6. Create a [Cloudinary](https://cloudinary.com/) account and create a new environment in clodinary. Then look for Cloud Name, API Key, and API Secret.
7. Make a .env file, then set these values: <br>
CLOUDINARY_CLOUD_NAME=your_cloud_name <br>
CLOUDINARY_KEY=your_API_key <br>
CLOUDINARY_SECRET=your_API_Secret <br>
8. Before running, make sure to run **mongod** from start menu or applications.
9. Once everything is done, run `node app` to start the application.
10. `localhost:3000` should be link to the website.
