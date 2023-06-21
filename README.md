# Thrifty

Kelompok 10

## How to Install

1. Install [NodeJS](https://nodejs.org/en/download).
2. Install [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) and for Windows users install [mongosh](https://www.mongodb.com/docs/mongodb-shell/install/) too.
4. Clone this repository.
5. Open command prompt in the cloned directory (where **package.json** is located) and run `npm install`.
6. Create a [Cloudinary](https://cloudinary.com/) account and create a new environment in clodinary. Then look for Cloud Name, API Key, and API Secret.
7. Make a .env file, then set these values:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_API_key
CLOUDINARY_SECRET=your_API_Secret
8. Before running, make sure to run **mongod** from start menu or applications.
9. Once everything is done, run `node app` to start the application.
10. `localhost:3000` should be link to the website.
