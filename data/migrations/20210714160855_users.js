exports.up = (knex) => {
    return knex.schema.createTable('users', users => {
        users.increments('id').primary();
        users.string('email').notNullable().unique();
        users.string('password').notNullable();
        users.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('users');
};