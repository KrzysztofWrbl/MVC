const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router.get('/new', eventController.showCreateForm);
router.get('/:id/edit', eventController.showEditForm);

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);

router.post('/:id/edit', eventController.updateEvent);
router.post('/:id/delete', eventController.deleteEvent);
router.post('/:id/reserve', eventController.reserveTicket);

module.exports = router;