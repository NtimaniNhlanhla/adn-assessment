const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Load env files
dotenv.config({ path: './config/config.env'});

// Route Files
const users = require('./routes/users');
const tickects = require('./routes/tickets');

const app = express();

// Body parser
app.use(express.json())

app.use(cookieParser());

// Enable CORS
app.use(cors())

// Mount Routers
app.use('/api/v1/users', users);
app.use('/api/v1/tickets', tickects);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));