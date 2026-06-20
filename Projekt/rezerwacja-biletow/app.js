require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Połączono z MongoDB');
    })
    .catch((error) => {
        console.log('Błąd połączenia z MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.redirect('/events');
});

app.use('/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});