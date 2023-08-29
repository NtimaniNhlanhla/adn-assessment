const knex =  require('../config/db/')

// @desc   Get all tickets
// @route  GET /api/v1/tickects
// @access Private
exports.getAllTickets = async (req, res) => {

    try {
        const tickets =  await knex.select().from('tickets')
        return res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// @desc   Create a tickets
// @route  POST /api/v1/tickects
// @access Private
exports.createTicket = async (req, res) => {

    const { description } = req.body;
    const user_id = req.user.id;
    try {
        const ticket = knex('tickets').insert({description, user_id});
        return res.status(201).send(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}