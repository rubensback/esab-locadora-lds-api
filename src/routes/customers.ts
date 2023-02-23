import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function customersRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const customers = await knex('customers').select()

    return { customers }
  })

  app.post('/', async (req, res) => {
    const createCustomerBodySchema = z.object({
      name: z.string(),
      phone: z.string(),
      fine: z.number().nullable(),
      discount: z.number().nullable(),
    })

    const { name, phone, fine, discount } = createCustomerBodySchema.parse(
      req.body,
    )

    await knex('customers').insert({
      id: randomUUID(),
      name,
      phone,
      fine,
      discount,
    })

    return res.status(201).send()
  })
}
