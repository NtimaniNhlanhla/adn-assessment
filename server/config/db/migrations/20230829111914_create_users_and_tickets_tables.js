/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable()
    table.timestamp('created_date').defaultTo(knex.fn.now());
    table.timestamp('updated_date').defaultTo(knex.fn.now());
  })
  .createTable('tickets', function(table) {
    table.increments();
    table.string('ticket_number').unique()
    table.string('description')
    table.timestamp('created_date').defaultTo(knex.fn.now());
    table.timestamp('updated_date').defaultTo(knex.fn.now());
    table.timestamp('deleted_date').defaultTo(knex.fn.now());
    table.integer('user_id').references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tickets').dropTable('users')
};
