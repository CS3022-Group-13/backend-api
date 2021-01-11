require('dotenv').config()

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            database: process.env.PG_DB,
            user: process.env.PG_USER,
            password: process.env.PG_PASS
        },
        migrations: {
            directory: './knex/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './knex/seeds',
            tableName: 'knex_seeds'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: "ec2-100-25-45-111.compute-1.amazonaws.com",
            port: 5432,
            database: "eims",
            user: "eims_user",
            password: "eims_user"
        },
        migrations: {
            directory: './knex/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './knex/seeds',
            tableName: 'knex_seeds'
        }
    }
};
