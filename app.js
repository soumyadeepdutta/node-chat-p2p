const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const authMiddleware = require('./middlewares/auth');
const userRouter = require('./routes/userRouter');
const app = express();

dotenv.config();

// db connect 
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => {
    console.log('Connected with database..');
})

// middlewares
app.use(express.json())
app.use(helmet());
app.use('/api/auth', authMiddleware);
// routes
app.use('/api/users', userRouter);



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started on ${port}`);
})