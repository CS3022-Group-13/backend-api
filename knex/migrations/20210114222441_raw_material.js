
exports.up = function(knex) {
    return knex.schema
    .createTable(
        'material',
        table => {
            table.uuid('material_id').primary()
            table.string('material_name',20)
            table.integer('quantity',10)  
            table.decimal('unit_price')
            
        })

    .createTable(
        'material_stock',
        table => {
            table.uuid('stock_id').primary();
            table.uuid("material_id").references("material_id").inTable("material")
            table.integer('quantity', 10)  
            table.decimal('unit_price')
            table.timestamp('date')
        }

    )
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('material_stock')
        .dropTable('material')
  
};
