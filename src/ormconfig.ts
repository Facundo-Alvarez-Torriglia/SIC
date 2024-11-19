import { DataSourceOptions, DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { Delegaciones } from './delegaciones/entity/delegaciones.entity'

dotenv.config()
const connectionOptions: DataSourceOptions = {
  type: (process.env.TYPEORM_CONNECTION as any) || 'mysql',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT ? +process.env.TYPEORM_PORT : 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  // logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
}

const AppDataSource = new DataSource(connectionOptions)

export default AppDataSource
