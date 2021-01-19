require('dotenv').config()
const {v4: UUID} = require('uuid')
const {hashSync} = require('bcrypt')


const user_seeds = [
    {
        user_id: UUID(),
        user_data: {
            first_name: 'Admin',
            last_name: 'User',
            email: 'admin-user@eims.com',
            telephone: '0777777777',
            user_type: "Administrator"
        },
        admin_account: {
            username: 'admin',
            password: hashSync('admin', Number(process.env.SALT_ROUNDS) || 10),
            verified: true
        }
    }
]

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('user_account').del()
    await knex('user_data').del()

    // Inserting Sample Users
    for (const s of user_seeds) {
        await knex('user_data').insert({
            user_id: s.user_id,
            ...s.user_data
        })
        await  knex('user_account').insert({
            user_id: s.user_id,
            ...s.admin_account
        })
    }
};
