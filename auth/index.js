const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

dotenv.config();
//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   () => {
      console.log('Connected to DB')
   })

//Middlewares
app.use(express.json());

app.use(cors());

//Route Middlewares
app.use('/api/user', authRoute);

app.use('/api/profile', profileRoute);

app.listen(3000, () => {
   console.log('Server is up and running')
})