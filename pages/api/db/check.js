import { connectToDatabase } from "../../../utils/sqlite";

export default async (req, res) => {
  const db = connectToDatabase();
  try {
    await db.get("SELECT COUNT(*) from teacher");
    await db.get("SELECT COUNT(*) from student");
    await db.get("SELECT COUNT(*) from discipline");
    await db.get("SELECT COUNT(*) from coursework");
    await db.get("SELECT COUNT(*) from course");
    res.json({ exists: true });
  } catch (e) {
    res.json({ exists: false });
  }
};
