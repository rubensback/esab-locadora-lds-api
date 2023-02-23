import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function employeesRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const employees = await knex('employees').select()

    return { employees }
  })
}
