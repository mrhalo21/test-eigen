import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'peminjaman',
  synchronize: true,
  bigNumberStrings: true,
  multipleStatements: true,
  logging: true,
  entities: ['**/*.entity{ .ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;