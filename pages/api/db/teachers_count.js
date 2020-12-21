import { connectToDatabase } from "../../../utils/sqlite";

// LEFT JOIN course
// ON course.teacher_id = teacher.teacher_id
// GROUP_BY teacher_id

export default (req, res) => {
  const db = connectToDatabase();
  let teachers = [];
  db.each(
    ` SELECT teacher.teacher_id, teacher_name, teacher_surname, teacher_patronymic, COUNT(*) as count
      FROM teacher
      LEFT JOIN course
      ON course.teacher_id = teacher.teacher_id
      GROUP BY teacher.teacher_id`,
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
