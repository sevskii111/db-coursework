import { connectToDatabase } from "../../../utils/sqlite";

export default (req, res) => {
  const db = connectToDatabase();
  switch (req.method) {
    case "DELETE":
      const course_id = req.query["course_id"];
      let coursewroksAmount = 0;
      db.each(
        `SELECT * FROM coursework WHERE course_id = ${course_id}`,
        function (err, coursework) {
          if (!err && coursework) {
            coursewroksAmount++;
          } else {
          }
        },
        () => {
          if (coursewroksAmount > 0) {
            res.json({
              success: 0,
              error:
                "В базе данных содержатся курсовые работы по этой дисциплине и для этого преподавателя, перед тем как удалять её необходимо удалить их",
            });
          } else {
            db.run(`DELETE FROM course WHERE course_id=${course_id}`)
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
      const { discipline_id, teacher_id } = req.body;
      db.run(
        `INSERT INTO course (discipline_id, teacher_id) VALUES ('${discipline_id}', '${teacher_id}')`
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
      let courses = [];
      db.each(
        "SELECT * FROM v_course",
        function (err, course) {
          if (!err && course) {
            courses.push(course);
          } else {
            console.log(err);
          }
        },
        () => {
          res.json(courses);
        }
      );
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
