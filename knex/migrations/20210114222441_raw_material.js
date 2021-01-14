
exports.up = function(knex) {
    return knex.schema
    .createTable(
        'raw_material',
        table => {
            table.uuid('material_id', 20).primary()
            table.string('material_name',20)
            table.integer('quantity',10)  
            table.decimal('unit_price')
            
        })

    .createTable(
        'raw_material_stock',
        table => {
            table.uuid('id',20).primary();
            table.uuid("material_id", 20).references("material_id").inTable("raw_material")
            table.integer('quantity', 10)  
            table.decimal('unit_price')
            table.timestamp('date')
        }

    )
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('raw_material_stock')
        .dropTable('raw_material')
  
};
