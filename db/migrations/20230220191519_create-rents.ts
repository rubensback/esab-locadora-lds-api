import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('rents', (table) => {
    table.uuid('id').primary()
    table.timestamp('expire').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    table.uuid('customer_id').unsigned()
    table.uuid('employee_id').unsigned()
    table.uuid('movie_id').unsigned()
    table.foreign('customer_id').references('Customer.id')
    table.foreign('employee_id').references('Employee.id')
    table.foreign('movie_id').references('Movie.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('rents')
}
