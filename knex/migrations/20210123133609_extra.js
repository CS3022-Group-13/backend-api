exports.up = function (knex) {
    const sql = `
        CREATE PROCEDURE reduce_product_quantity(productId uuid, amount integer)
        LANGUAGE SQL AS $$
            UPDATE product p SET quantity=(SELECT quantity FROM product WHERE product_id=productId) - amount WHERE product_id=productId;
        $$;
    `
    return knex.raw(
        sql
    )
};

exports.down = function (knex) {
    return knex.raw('DROP PROCEDURE IF EXISTS reduce_product_quantity');
};
