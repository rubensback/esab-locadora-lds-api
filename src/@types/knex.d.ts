// eslint-disable-next-line no-unused-vars
import { Knex } from 'knex'
import { MovieStatusOptions, MovieTypesOptions } from '../enums'

declare module 'knex/types/tables' {
  export interface Tables {
    customers: {
      id: string
      name: string
      phone: string
      fine: number | null
      discount: number | null
      created_at: string
    }
    employees: {
      id: string
      name: string
      qty_rents: number
      created_at: string
    }
    movies: {
      id: string
      name: string
      days: number
      value: number
      created_at: string
      movie_type_id: MovieTypesOptions
      movie_status_id: MovieStatusOptions
    }
    rents: {
      id: string
      created_at: string
      customer_id: string
      employee_id: string
      expire: string
      movie_id: string
    }
    movie_types: {
      id: string
      name: string
      cost_by_day: number
      created_at: string
    }
    movie_status: {
      id: string
      name: string
      created_at: string
    }
  }
}
