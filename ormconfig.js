module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: process.env.POSTGRES_PORT ?? 5432,
  username: process.env.POSTGRES_USERNAME ?? 'kersanuser',
  password: process.env.POSTGRES_PASSWORD ?? 'ABshXc4ahs3',
  database: process.env.POSTGRES_DATABASE ?? 'kersan',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrations: ['dist/**/*.migration{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
