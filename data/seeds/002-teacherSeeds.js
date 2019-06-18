
exports.seed = function(knex, Promise) {
  return knex('teachers').insert([
    {teacher_name: "Izumi Sakurai", class_year: 3, class_section: "B"},
    {teacher_name: "Manabu Takasaki", class_year: 3, class_section: "A"},
    {teacher_name: "Kana Nakamura", class_year: 3, class_section: "C"},
  ]);
};
