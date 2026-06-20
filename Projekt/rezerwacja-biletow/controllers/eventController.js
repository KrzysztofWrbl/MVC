const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
    const search = req.query.search || '';

    const events = await Event.find({
        nazwaWydarzenia: {
            $regex: search,
            $options: 'i'
        }
    });

    res.render('events/list', { events, search });
};

exports.showCreateForm = (req, res) => {
    res.render('events/new');
};

exports.createEvent = async (req, res) => {
    await Event.create({
        nazwaWydarzenia: req.body.nazwaWydarzenia,
        data: req.body.data,
        liczbaMiejsc: req.body.liczbaMiejsc
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
        liczbaMiejsc: req.body.liczbaMiejsc
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