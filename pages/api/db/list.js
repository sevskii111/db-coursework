import { connectToDatabase } from "../../../utils/sqlite";

// LEFT JOIN course
// ON course.teacher_id = teacher.teacher_id
// GROUP_BY teacher_id

export default (req, res) => {
  const db = connectToDatabase();
  let teachers = [];
  db.each(
    ` SELECT teacher_name as name, teacher_surname as surname, teacher_patronymic as patronymic, "Преподаватель" as role
      FROM teacher
      UNION
      SELECT student_name as name, student_surname as surname, student_patronymic as patronymic, "Студент" as role
      FROM student`,
    function (err, teacher) {
      if (!err && teacher) {
        teachers.push(teacher);
      } else {
        console.log(err);
      }
    },
    () => {
      res.json(teachers);
    }
  );
};

export const config = {
  api: {
    externalResolver: true,
  },
};
