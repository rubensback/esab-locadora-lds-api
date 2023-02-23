import fastify from 'fastify'
import { knex } from './database'
import cors from '@fastify/cors'
import { customersRoutes } from './routes/customers'
import { employeesRoutes } from './routes/employees'
import { moviesRoutes } from './routes/movies'
import { rentsRoutes } from './routes/rents'

const app = fastify()

app.register(cors)
app.addHook('preHandler', async (req, res) => {
  console.log(`[${req.method}] ${req.url}`)
})
app.register(customersRoutes, { prefix: 'customers' })
app.register(employeesRoutes, { prefix: 'employees' })
app.register(moviesRoutes, { prefix: 'movies' })
app.register(rentsRoutes, { prefix: 'rents' })

app.get('/schema', async () => {
  const schema = knex('sqlite_schema').select('*')

  return schema
})

app
  .listen({
    port: 3334,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
