exports.up = function (knex) {
    return knex.schema
        .createTable(
            'user_type',
            table => {
                table.string('type', 20).primary()
            })
        .createTable(
            'user',
            table => {
                table.uuid('user_id').primary()
                table.string('first_name', 50)
                table.string('last_name', 50)
                table.string('email', 40).unique()
                table.string('telephone', 13)
                table.string('user_type', 20).references('type').inTable('user_type')
            })
        .createTable(
            'user_account',
            table => {
                table.uuid('user_id').primary().references('user_id').inTable('user')
                table.string('username', 50).unique()
                table.string('password', 100)
                table.boolean('verified')
            })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('user_account')
        .dropTable('user')
        .dropTable('user_type')
};
