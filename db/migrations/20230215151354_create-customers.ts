import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('phone').notNullable()
    table.decimal('fine', 10, 2)
    table.decimal('discount', 10, 2)
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('customers')
}
