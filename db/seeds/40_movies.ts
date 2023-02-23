import { randomUUID } from 'crypto'
import { Knex } from 'knex'
import { MovieStatus, MovieTypes } from '../../src/enums'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('movies').del()

  // Inserts seed entries
  await knex('movies').insert([
    {
      id: randomUUID(),
      name: 'O Poderoso Chefão',
      days: 10,
      value: 2.0,
      movie_status_id: MovieStatus.AVAILABLE,
      movie_type_id: MovieTypes.VHS,
    },
    {
      id: randomUUID(),
      name: 'A lista de Schindler',
      days: 8,
      value: 5.0,
      movie_status_id: MovieStatus.LOST,
      movie_type_id: MovieTypes.VHS,
    },
    {
      id: randomUUID(),
      name: 'Batman',
      days: 15,
      value: 9.0,
      movie_status_id: MovieStatus.AVAILABLE,
      movie_type_id: MovieTypes.DVD,
    },
    {
      id: randomUUID(),
      name: 'A Ilha do Medo',
      days: 6,
      value: 9.0,
      movie_status_id: MovieStatus.RENTED,
      movie_type_id: MovieTypes.BLUE_RAY,
    },
    {
      id: randomUUID(),
      name: 'Avatar 2',
      days: 12,
      value: 18.0,
      movie_status_id: MovieStatus.RENTED,
      movie_type_id: MovieTypes.BLUE_RAY,
    },
    {
      id: randomUUID(),
      name: 'Joker',
      days: 4,
      value: 12.0,
      movie_status_id: MovieStatus.AVAILABLE,
      movie_type_id: MovieTypes.DVD,
    },
    {
      id: randomUUID(),
      name: 'Top Gun',
      days: 18,
      value: 10.0,
      movie_status_id: MovieStatus.RENTED,
      movie_type_id: MovieTypes.DVD,
    },
  ])
}
