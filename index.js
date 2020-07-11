  
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const todoRoutes = require('./routes/todo.routes.js')
app.use('/todos', todoRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


const dbConfig = require('./config/db.config.js');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, 
    useFindAndModify: false
}, (err) => {
    if (err) {
        process.exit(1);
        console.log('unable to connect to database');
    }
    else
        console.log('successfully connected to the database');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is running on port ${port}` );
});