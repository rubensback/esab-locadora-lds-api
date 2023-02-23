import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('movie_types').del()

  // Inserts seed entries
  await knex('movie_types').insert([
    { id: '1', name: 'VHS', cost_by_day: 0.5 },
    { id: '2', name: 'DVD', cost_by_day: 1.75 },
    { id: '3', name: 'Blu-ray', cost_by_day: 2.5 },
  ])
}
