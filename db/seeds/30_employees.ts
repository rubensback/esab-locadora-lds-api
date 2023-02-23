import { randomUUID } from 'crypto'
import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('employees').del()

  // Inserts seed entries
  await knex('employees').insert([
    { id: randomUUID(), name: 'Abel Ferreira', qty_rents: 12 },
    { id: randomUUID(), name: 'Gustavo Gomez', qty_rents: 5 },
    { id: randomUUID(), name: 'Raphael Veiga', qty_rents: 0 },
  ])
}
