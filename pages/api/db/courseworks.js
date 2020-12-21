import { connectToDatabase } from "../../../utils/sqlite";

export default (req, res) => {
  const db = connectToDatabase();
  switch (req.method) {
    case "DELETE":
      var { student_id, course_id } = req.query;
      db.run(
        `DELETE FROM coursework WHERE student_id=${student_id} AND course_id=${course_id}`
      )
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
      break;
    case "PUT":
      var { course_id, student_id, coursework_theme } = req.body;
      db.run(
        `INSERT INTO coursework (course_id, student_id, coursework_theme) VALUES ('${course_id}', '${student_id}', '${coursework_theme}')`
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
        "SELECT * FROM v_coursework",
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
