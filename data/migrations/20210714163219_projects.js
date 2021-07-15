exports.up = (knex) => {
    return knex.schema.createTable('projects', projects => {
        projects.increments('id').primary();
        projects.string('title', 30).notNullable();
        projects.string('description', 140);
        projects.enu('status', [
            'stuck',
            'working_on_it',
            'done',
            'archived',
        ])
            .notNullable()
            .defaultsTo('working_on_it');
        projects
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        projects.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('projects');
};