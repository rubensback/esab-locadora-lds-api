import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('movie_status').del()

  // Inserts seed entries
  await knex('movie_status').insert([
    { id: '1', name: 'Disponivel' },
    { id: '2', name: 'Alugado' },
    { id: '3', name: 'Perdido' },
  ])
}
