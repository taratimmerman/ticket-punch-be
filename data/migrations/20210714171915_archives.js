exports.up = (knex) => {
    return knex.schema.createTable('archives', archives => {
        archives.increments('id').primary();
        archives
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        archives
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        archives
            .integer('ticket_id')
            .unsigned()
            .references('id')
            .inTable('tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        archives.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('archives');
};