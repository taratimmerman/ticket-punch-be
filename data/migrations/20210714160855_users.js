exports.up = (knex) => {
    return knex.schema.createTable('users', users => {
        users.increments('id').primary();
        users.string('username', 30).notNullable().unique();
        users.string('password', 140).notNullable();
        users.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('users');
};