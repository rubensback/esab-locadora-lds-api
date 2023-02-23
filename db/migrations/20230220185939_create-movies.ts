import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movies', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.integer('days').notNullable()
    table.decimal('value', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    table.uuid('movie_type_id').unsigned()
    table.foreign('movie_type_id').references('Movie_Types.id')
    table.uuid('movie_status_id').unsigned()
    table.foreign('movie_status_id').references('Movie_Status.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('movies')
}
