exports.up = function (knex) {
  return knex.schema.createTable("produtos", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.string("marca").notNullable();
    table.decimal("valor", 10, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("produtos");
};
