import { connectToDatabase } from "../../../utils/sqlite";

export async function drop(db) {
  await db.run("DROP TABLE IF EXISTS teacher");
  await db.run("DROP TABLE IF EXISTS student");
  await db.run("DROP TABLE IF EXISTS discipline");
  await db.run("DROP TABLE IF EXISTS coursework");
  await db.run("DROP TABLE IF EXISTS coursework_themes_archive");
  await db.run("DROP TABLE IF EXISTS course");
  await db.run("DROP VIEW  IF EXISTS v_course");
  await db.run("DROP VIEW  IF EXISTS v_coursework");
  await db.run("DROP TRIGGER  IF EXISTS add_theme_to_archive");
}

export default async (req, res) => {
  const db = connectToDatabase();
  await drop(db);
  res.send({ success: 1 });
};
