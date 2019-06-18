
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string('username', 128).unique().notNullable();
      table.string('password', 128).notNullable();
  })
  .createTable('students', table => {
      table.increments();
      table.string('student_name', 128).unique().notNullable();
      table.integer('class_year').notNullable();
      table.string('class_section').notNullable();
  })
  .createTable('teachers', table => {
      table.increments();
      table.string('teacher_name', 128).unique().notNullable();
      table.integer('class_year').notNullable();
      table.string('class_section').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(
      'users',
      'students',
      'teachers'
  )
};
