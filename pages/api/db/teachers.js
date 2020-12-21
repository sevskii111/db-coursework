import { connectToDatabase } from "../../../utils/sqlite";

export default (req, res) => {
  const db = connectToDatabase();
  switch (req.method) {
    case "DELETE":
      const teacher_id = req.query["teacher_id"];
      let teacherdisciplinesAmount = 0;
      db.each(
        `SELECT * FROM teachersdiscipline WHERE teacher_id = ${teacher_id}`,
        function (err, coursework) {
          if (!err && coursework) {
            teacherdisciplinesAmount++;
          } else {
          }
        },
        () => {
          if (teacherdisciplinesAmount > 0) {
            res.json({
              success: 0,
              error:
                "В базе данных содержатся курсы этого преподавателя, перед тем как удалять его необходимо удалить их",
            });
          } else {
            db.run(`DELETE FROM teacher WHERE teacher_id=${teacher_id}`)
              .then((s) => {
                res.json({ success: 1 });
              })
              .catch((e) => {
                console.log(e);
                res.json({
                  success: 0,
                  error: "Произошла непредвиденная ошибка",
                });
              });
          }
        }
      );
      break;
    case "PUT":
      const { name, surname, patronymic } = req.body;
      db.run(
        `INSERT INTO teacher (teacher_name, teacher_surname, teacher_patronymic) VALUES ('${name}', '${surname}', '${patronymic}')`
      )
        .then((s) => {
          res.send({ success: 1 });
        })
        .catch((e) => {
          console.log(e);
          res.send({ success: 0 });
        });
      break;
    default:
      let teachers = [];
      db.each(
        "SELECT * FROM teacher",
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
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
