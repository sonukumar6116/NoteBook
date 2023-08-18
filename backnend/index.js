//--------Entry point------------
const express = require('express')
var cors = require('cors')

//--------Connecting to DB------------
const connectToMongo = require('./db')
connectToMongo();

const app = express();
const port = 5000;
app.use(cors())

//--------staring Routing------------
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
