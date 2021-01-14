
exports.up = function(knex) {
    return knex.schema
    .createTable(
        'customer',
        table => {
            table.uuid('customer_id', 20).primary()
            table.string('first_name', 50)
            table.string('last_name', 50)
            table.string("phone",20)
            table.string("email",25)
        })
    .createTable(
        'customer_account',
        table => {
            table.uuid('customer_id', 20).primary().references('customer_id').inTable('customer')
            table.string('username', 50)
            table.string('password', 100)
            table.boolean('status') // Disabled = 0 or Enable = 1
        }
    )
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('customer_account')
        .dropTable('customer')
};
