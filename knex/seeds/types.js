
const user_types = [
    "Inventory Manager",
    "Sales Manager",
    "Administrator"
]

const order_states = [
    "Placed",
    "Paid",
    "Delivered"
]

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('user_type').del()
    await knex('order_status').del()

    // Inserting user types
    for (const t of user_types) {
        await knex('user_type').insert({
            type: t
        })
    }

    // Inserting order states
    for (const s of order_states) {
        await knex('order_status').insert({
            status: s
        })
    }

};