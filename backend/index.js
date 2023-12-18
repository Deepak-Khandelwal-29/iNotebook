const connectToMongo = require('./db');
const express = require('express');
const port = 5000;
const cors = require('cors')

connectToMongo();
const app = express();
app.use(express.json())
app.use(cors())

const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/notes')

app.use('/', authRoutes)
app.use('/notes', notesRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});