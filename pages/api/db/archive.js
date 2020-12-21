import { connectToDatabase } from "../../../utils/sqlite";

export default (req, res) => {
  const db = connectToDatabase();
  let themes = [];
  db.each(
    "SELECT * FROM coursework_themes_archive",
    function (err, theme) {
      if (!err && theme) {
        themes.push(theme.coursework_theme);
      } else {
        console.log(err);
      }
    },
    () => {
      res.json(themes);
    }
  );
};

export const config = {
  api: {
    externalResolver: true,
  },
};
