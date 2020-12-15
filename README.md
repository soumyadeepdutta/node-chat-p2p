# NodeJS P2P chat application.
A simple chat API where user can send direct message to another user after authentication.
The database used id MongoDB and authentication is done using JWT.

<img src="https://img.shields.io/badge/node-v12.19.0-blue" /> <img src="https://img.shields.io/badge/npm-6.14.8-orange" /> <img src="https://img.shields.io/badge/express-4.17.1-green" />

## Done
1. User model
2. MongoDB connection
3. User register

## Todo
1. User login
2. Send message

## Usage
Clone this repository

``git clone https://github.com/soumyadeepdutta/node-chat-p2p.git``

Change directory to 'node-chat-p2p'
```console
$cd node-chat-p2p
```
Create a .env (configuration) file here, which includes
```js
PORT = 3000 // the port to be used during development
DB_CONNECT = <your-mongodb-uri>
```
Install the dependencies and start the server
```console
$npm install
$num run start
```
To run in development mode using Nodemon (hot-reload)
```console
$npm run devstart
```

Report bugs <a href="https://github.com/soumyadeepdutta/node-chat-p2p/issues">here </a>.
