const knex =  require('../config/db/knex')

// @desc   Get all tickets
// @route  GET /api/v1/tickects
// @access Private
exports.getAllTickets = async (req, res) => {

    try {
        const tickets =  await knex.select().from('tickets')
        return res.status(200).json({
            success: true,
            tickets
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// @desc   Create a tickets
// @route  POST /api/v1/tickects
// @access Private
exports.createTicket = async (req, res) => {

    const { description } = req.body;
    const user_id = req.user[0].id;

    try {
        const ticket = await knex('tickets').insert({description, user_id});
        return res.status(201).json({
            success: true,
            ticket
         });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}