const express = require('express');
const { getAllTickets, createTicket } = require('../controllers/tickets');

const { authenticated } = require('../middleware/auth')

const router = express.Router();

router.route('/').post(authenticated, createTicket);
router.route('/').get(authenticated, getAllTickets);

module.exports = router;