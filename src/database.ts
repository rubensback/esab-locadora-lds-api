import { knex as setupKnex, Knex } from 'knex'
import 'dotenv'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
  // debug: true,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: 'db/migrations',
  },
  seeds: {
    extension: 'ts',
    directory: 'db/seeds',
  },
  // pool: {
  //   afterCreate: (conn: any, cb: any) =>
  //     conn.run('PRAGMA foreign_keys = ON', cb),
  // },
}

export const knex = setupKnex(config).on('query', ({ bindings, sql }) => {
  console.info(`SQL: `, [sql])
  console.info(`Bindings: `, bindings)
  console.log('/---------------------------------------/')
})
