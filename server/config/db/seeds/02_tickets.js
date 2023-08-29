/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tickets').del()
  await knex('tickets').insert([
   {id:1,ticket_number: 'T001', description: 'This is a test ticket', user_id: 1}
  ]);
};
