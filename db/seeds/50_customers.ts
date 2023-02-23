import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('customers').del()

  // Inserts seed entries
  await knex('customers').insert([
    {
      id: randomUUID(),
      name: 'Danilo Souza',
      phone: '99999-2222',
      fine: 2,
      discount: 3,
    },
  ])
}
