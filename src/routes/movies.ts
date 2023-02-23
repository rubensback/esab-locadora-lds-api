/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { MovieStatus, MovieTypes } from '../enums'

export async function moviesRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const getMoviesParamsSchema = z.object({
      name: z.string().optional(),
      type: z.string().optional(),
      status: z.string().optional(),
    })

    const { name, type, status } = getMoviesParamsSchema.parse(req.query)

    const movies = await knex('movies')
      .select([
        'movies.id',
        'movies.name',
        'movies.days',
        'movies.value',
        'movies.movie_type_id',
        'movies.movie_status_id',
        'movie_types.name as movie_type_name',
        'movie_status.name as movie_status_name',
        'movie_types.cost_by_day',
      ])
      .whereLike('movies.name', `%${name || ''}%`)
      .whereLike('movie_type_id', `%${type || ''}%`)
      .whereLike('movie_status_id', `%${status || ''}%`)
      .leftJoin('movie_types', 'movies.movie_type_id', '=', 'movie_types.id')
      .leftJoin(
        'movie_status',
        'movies.movie_status_id',
        '=',
        'movie_status.id',
      )

    return { movies }
  })

  app.post('/', async (req, res) => {
    const createMovieBodySchema = z.object({
      name: z.string(),
      days: z.number(),
      value: z.number(),
      movie_type_id: z.enum([
        MovieTypes.VHS,
        MovieTypes.DVD,
        MovieTypes.BLUE_RAY,
      ]),
      movie_status_id: z.enum([
        MovieStatus.AVAILABLE,
        MovieStatus.RENTED,
        MovieStatus.LOST,
      ]),
    })

    const { name, days, value, movie_type_id, movie_status_id } =
      createMovieBodySchema.parse(req.body)

    await knex('movies').insert({
      id: randomUUID(),
      name,
      days,
      value,
      movie_type_id,
      movie_status_id,
    })

    return res.status(201).send()
  })

  app.put('/:id', async (req, res) => {
    const editMovieParamsSchema = z.object({
      id: z.string(),
    })

    const editMovieBodySchema = z.object({
      name: z.string(),
      days: z.number(),
      value: z.number(),
      movie_type_id: z.enum([
        MovieTypes.VHS,
        MovieTypes.DVD,
        MovieTypes.BLUE_RAY,
      ]),
      movie_status_id: z.enum([
        MovieStatus.AVAILABLE,
        MovieStatus.RENTED,
        MovieStatus.LOST,
      ]),
    })

    const { id } = editMovieParamsSchema.parse(req.params)
    const { name, days, value, movie_type_id, movie_status_id } =
      editMovieBodySchema.parse(req.body)

    await knex('movies').where('id', id).update({
      name,
      days,
      value,
      movie_type_id,
      movie_status_id,
    })

    return res.status(200).send()
  })

  app.get('/types', async (req, res) => {
    const movie_types = await knex('movie_types').select()

    return { movie_types }
  })

  app.get('/status', async (req, res) => {
    const movie_status = await knex('movie_status').select()

    return { movie_status }
  })
}
