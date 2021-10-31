require('dotenv').config()
const express = require('express');
const cors = require('cors');

const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

const app = express();

app.use(cors())
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('<h1>Testing Routes</h1>')
});

app.use(router)
app.use(errorHandler)


app.listen(process.env.PORT || 3001, () => {
    console.log('Running at port 3001')
})