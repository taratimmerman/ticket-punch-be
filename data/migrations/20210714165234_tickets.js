exports.up = (knex) => {
    return knex.schema.createTable('tickets', tickets => {
        tickets.increments('id').primary();
        tickets.string('title', 30).notNullable();
        tickets.string('description', 140);
        tickets.enu('status', [
            'stuck',
            'working_on_it',
            'done',
        ])
            .notNullable()
            .defaultsTo('working_on_it');
        tickets.boolean('bug').defaultsTo('false');
        tickets
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tickets
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tickets.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('tickets');
};