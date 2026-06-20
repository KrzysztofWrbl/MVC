const Event = require('../models/Event');
const axios = require('axios');

exports.getAllEvents = async (req, res) => {
    const search = req.query.search || '';

    const events = await Event.find({
        nazwaWydarzenia: {
            $regex: search,
            $options: 'i'
        }
    });

    for (const event of events) {
        try {
            const geoResponse = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(event.lokalizacja)}&count=1`
            );

            if (geoResponse.data.results?.length > 0) {
                const { latitude, longitude } = geoResponse.data.results[0];

                const weatherResponse = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
                );

                const temperatura = Math.round(
                    weatherResponse.data.current.temperature_2m
                );

                const weatherCode = weatherResponse.data.current.weather_code;

                let opisPogody = 'Nieznana';

                switch (weatherCode) {
                    case 0:
                        opisPogody = 'Bezchmurnie';
                        break;
                    case 1:
                    case 2:
                    case 3:
                        opisPogody = 'Zachmurzenie';
                        break;
                    case 45:
                    case 48:
                        opisPogody = 'Mgła';
                        break;
                    case 51:
                    case 53:
                    case 55:
                        opisPogody = 'Mżawka';
                        break;
                    case 61:
                    case 63:
                    case 65:
                        opisPogody = 'Deszcz';
                        break;
                    case 71:
                    case 73:
                    case 75:
                        opisPogody = 'Śnieg';
                        break;
                    case 95:
                        opisPogody = 'Burza';
                        break;
                }

                event.pogoda = `${temperatura}°C (${opisPogody})`;
            } else {
                event.pogoda = 'Brak danych';
            }
        } catch (error) {
            event.pogoda = 'Błąd API';
        }
    }

    res.render('events/list', { events, search });
};

exports.showCreateForm = (req, res) => {
    res.render('events/new');
};

exports.createEvent = async (req, res) => {
    await Event.create({
        nazwaWydarzenia: req.body.nazwaWydarzenia,
        data: req.body.data,
        liczbaMiejsc: req.body.liczbaMiejsc,
        lokalizacja: req.body.lokalizacja
    });

    res.redirect('/events');
};

exports.deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
};

exports.showEditForm = async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render('events/edit', { event });
};

exports.updateEvent = async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id, {
        nazwaWydarzenia: req.body.nazwaWydarzenia,
        data: req.body.data,
        liczbaMiejsc: req.body.liczbaMiejsc,
        lokalizacja: req.body.lokalizacja
    });

    res.redirect('/events');
};

exports.reserveTicket = async (req, res) => {

    const event = await Event.findById(req.params.id);

    if (event.liczbaMiejsc > 0) {

        event.liczbaMiejsc -= 1;

        await event.save();
    }

    res.redirect('/events');
};