
exports.up = function(knex) {
    return knex.schema
        .createTable(
            'finished_product',
            table => {
                table.uuid('product_id').primary()
                table.string('product_name', 20)
                table.integer('quantity', 10)
                table.decimal('unit_price')

            })
        .createTable(
            "finished_product_stock",
            table=>{
                table.uuid("stock_id").primary()
                table.uuid('product_id').references('product_id').inTable('finished_product')
                table.integer('quantity', 10)
                table.decimal('unit_price')
                table.timestamp("date")

            }
        )

       
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('finished_produc_stock')
    .dropTable('finished_product')

};
