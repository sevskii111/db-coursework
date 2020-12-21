import { connectToDatabase } from "../../../utils/sqlite";

export default (req, res) => {
  const db = connectToDatabase();
  switch (req.method) {
    case "DELETE":
      const discipline_id = req.query["discipline_id"];
      let teacherdisciplinesAmount = 0;
      db.each(
        `SELECT * FROM teachersdiscipline WHERE discipline_id = ${discipline_id}`,
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
                "В базе данных содержатся курсы по этой дисциплине, перед тем как удалять её необходимо удалить их",
            });
          } else {
            db.run(
              `DELETE FROM discipline WHERE discipline_id=${discipline_id}`
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
          }
        }
      );
      break;
    case "PUT":
      const { name } = req.body;
      db.run(`INSERT INTO discipline (discipline_name) VALUES ('${name}')`)
        .then((s) => {
          res.send({ success: 1 });
        })
        .catch((e) => {
          console.log(e);
          res.send({ success: 0 });
        });
      break;
    default:
      let disciplines = [];
      db.each(
        "SELECT * FROM discipline",
        function (err, discipline) {
          if (!err && discipline) {
            disciplines.push(discipline);
          } else {
            console.log(err);
          }
        },
        () => {
          res.json(disciplines);
        }
      );
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
