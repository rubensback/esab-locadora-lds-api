/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { MovieStatus } from '../enums'

export async function rentsRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const rents = await knex('rents').select()

    return { rents }
  })

  app.post('/', async (req, res) => {
    const createRentBodySchema = z.object({
      customer_id: z.string(),
      employee_id: z.string(),
      movie_id: z.string(),
      expire: z.string().datetime(),
    })

    const { customer_id, employee_id, movie_id, expire } =
      createRentBodySchema.parse(req.body)

    await knex('rents').insert({
      id: randomUUID(),
      customer_id,
      employee_id,
      movie_id,
      expire,
    })

    await knex('employees').where('id', employee_id).increment('qty_rents', 1)

    await knex('movies')
      .where('id', movie_id)
      .update('movie_status_id', MovieStatus.RENTED)

    return res.status(200).send()
  })
}
