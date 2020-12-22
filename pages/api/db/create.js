import { connectToDatabase } from "../../../utils/sqlite";
import { drop } from "./drop";
import { generateTables } from "../../../utils/tables_content_generator";
import fs from "fs";

async function create_tables(db) {
  await db.run(`CREATE TABLE teacher (
    teacher_id integer PRIMARY KEY AUTOINCREMENT,
    teacher_surname varchar(50) NOT NULL,
    teacher_name varchar(50) NOT NULL,
    teacher_patronymic varchar(50)
  );`);
  await db.run(`CREATE TABLE student (
    student_id integer PRIMARY KEY AUTOINCREMENT,
    student_surname varchar(50) NOT NULL,
    student_name varchar(50) NOT NULL,
    student_patronymic varchar(50)
  );`);
  await db.run(`CREATE TABLE discipline (
    discipline_id integer PRIMARY KEY AUTOINCREMENT,
    discipline_name varchar(50) NOT NULL UNIQUE
  );`);
  await db.run(`CREATE TABLE course (
    course_id integer PRIMARY KEY AUTOINCREMENT,
    discipline_id INTEGER REFERENCES discipline(discipline_id) NOT NULL,
    teacher_id INTEGER REFERENCES teacher(teacher_id) NOT NULL
  );`);
  await db.run(`CREATE TABLE coursework (
    student_id INTEGER REFERENCES student(student_id) NOT NULL,
    course_id INTEGER REFERENCES course(course_id) NOT NULL,
    coursework_theme varchar(500) NOT NULL,
    PRIMARY KEY (student_id, course_id)
  );`);
  await db.run(`CREATE TABLE coursework_themes_archive (
    coursework_theme varchar(500) PRIMARY KEY
  );`);
}

async function add_triggers(db) {
  await db.run(`CREATE TRIGGER add_theme_to_archive AFTER INSERT ON coursework
  BEGIN
    INSERT INTO coursework_themes_archive(coursework_theme) VALUES (NEW.coursework_theme);
  END`);
}

async function fill_tables(db) {
  const tables = generateTables();
  //fs.writeFileSync("fill.sql", tables.join("\n\n"));
  for (const table of tables) {
    await db.run(table);
  }
}

async function add_views(db) {
  await db.run(`CREATE VIEW v_course
  AS SELECT
    course_id,
    teacher.teacher_id,
    teacher_name,
    teacher_surname,
    teacher_patronymic,
    discipline.discipline_id,
    discipline_name
  FROM
    course
  LEFT JOIN teacher ON teacher.teacher_id = course.teacher_id
  LEFT JOIN discipline ON discipline.discipline_id = course.discipline_id
  `);
  await db.run(`CREATE VIEW v_coursework
  AS SELECT
    coursework_theme,
    coursework.student_id,
    coursework.course_id,
    student_name,
    student_surname,
    student_patronymic,
    teacher_name,
    teacher_surname,
    teacher_patronymic,
    discipline_name
  FROM
    coursework
  LEFT JOIN course ON coursework.course_id = course.course_id
  LEFT JOIN teacher ON teacher.teacher_id = course.teacher_id
  LEFT JOIN discipline ON discipline.discipline_id = course.discipline_id
  LEFT JOIN student ON student.student_id = coursework.student_id
  `);
}

export default async (req, res) => {
  const db = connectToDatabase();
  try {
    await drop(db);
  } catch (e) {}
  try {
    await create_tables(db);
    await add_triggers(db);
    await fill_tables(db);
    await add_views(db);
    res.json({ success: 1 });
  } catch (e) {
    console.log(e);
    res.json({ success: 0 });
  }
};
