
exports.up = function (knex) {
    return knex.schema
        .createTable(
            'order_status',
            table => {
                table.string('status', 20).primary()
            }

        )
        .createTable(
            'sales_order',
            table => {
                table.uuid('order_id').primary()
                table.uuid('customer_id').references('customer_id').inTable('customer')
                table.string('order_status',20).references('status').inTable('order_status')
                table.timestamp('order_date')
            }
        )
        .createTable(
            'order_item',
            table => {
                table.uuid('order_id').references('order_id').inTable('sales_order')
                table.uuid('product_id').references('product_id').inTable('finished_product')
                table.integer('quantity', 10)
                table.decimal('unit_price')
                table.primary(['order_id', 'product_id'])

            }
        )
        .createTable(
            'invoice',
            table => {
                table.uuid('invoice_id').primary()
                table.uuid('order_id').references('order_id').inTable('sales_order')
                table.timestamp('invoice_date')
                table.decimal('invoice_total')

            }
        )
        .createTable(
            'payments',
            table => {
                table.uuid('payment_id').primary()
                table.uuid('customer_id').references('customer_id').inTable('customer')
                table.uuid('invoice_id').references('invoice_id').inTable('invoice')
                table.decimal('amount')
            }
            
        )
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('payments')
        .dropTable('invoice')
        .dropTable('order_item')
        .dropTable('sales_order')
        .dropTable('order_status')
};
