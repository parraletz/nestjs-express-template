export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api_key: process.env.API_KEY,
  redis_host: process.env.REDIS_HOST,
  redis_port: parseInt(process.env.REDIS_PORT, 10),
  database: {
    host: process.env.DATABASE_HOST || process.env.POSTGRES_HOST,
    username: process.env.DATABASE_USER || process.env.POSTGRES_USER,
    password: process.env.DATABASE_PASSWORD || process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT || process.env.POSTGRES_PORT, 10)
  }
})
