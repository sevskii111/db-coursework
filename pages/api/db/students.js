import { connectToDatabase } from "../../../utils/sqlite";

export default (req, res) => {
  const db = connectToDatabase();
  switch (req.method) {
    case "DELETE":
      const student_id = req.query["student_id"];
      let courseworksAmount = 0;
      db.each(
        `SELECT * FROM coursework WHERE student_id = ${student_id}`,
        function (err, coursework) {
          if (!err && coursework) {
            courseworksAmount++;
          } else {
          }
        },
        () => {
          if (courseworksAmount > 0) {
            res.json({
              success: 0,
              error:
                "В базе данных содержатся курсовые работы этого студента, перед тем как удалять его необходимо удалить их",
            });
          } else {
            db.run(`DELETE FROM student WHERE student_id=${student_id}`)
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
        `INSERT INTO student (student_name, student_surname, student_patronymic) VALUES ('${name}', '${surname}', '${patronymic}')`
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
      let students = [];
      db.each(
        "SELECT * FROM student",
        function (err, student) {
          if (!err && student) {
            students.push(student);
          } else {
            console.log(err);
          }
        },
        () => {
          res.json(students);
        }
      );
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
