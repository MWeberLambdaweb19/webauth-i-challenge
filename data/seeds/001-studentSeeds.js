
exports.seed = function(knex, Promise) {
  return knex('students').insert([
    {student_name: "Yuuko Aioi", class_year: 3, class_section: "B"},
    {student_name: "Mio Naganohara", class_year: 3, class_section: "B"},
    {student_name: "Mai Minakami", class_year: 3, class_section: "B"},
  ]);
};
