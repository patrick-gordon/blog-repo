
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username', 128)
        .unique()
        .notNullable();
      tbl.string('password', 20)
        .notNullable()
    })
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.string('title')
        .notNullable()
      tbl.text('contents');
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
