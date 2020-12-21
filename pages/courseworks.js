import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Desciplines() {
  const [courseworks, setCourseworks] = useState(null);
  const [_courses, setCourses] = useState(null);
  const [_students, setStudents] = useState(null);
  const [student_id, setStudent_id] = useState("");
  const [course_id, setCourse_id] = useState("");
  const [theme, setTheme] = useState("");
  useEffect(async () => {
    const [courseworks, courses, students] = await Promise.all([
      axios("/api/db/courseworks"),
      axios("/api/db/courses"),
      axios("/api/db/students"),
    ]);
    setCourseworks(courseworks.data);
    setCourses(courses.data);
    setStudents(students.data);
  }, []);

  if (courseworks === null || _courses === null || _students === null) {
    return (
      <div className="container">
        <main>Loading...</main>
      </div>
    );
  } else {
    let courses = {};
    let students = {};
    for (const course of _courses) {
      courses[
        course.course_id
      ] = `${course.discipline_name} - ${course.teacher_surname} ${course.teacher_name} ${course.teacher_patronymic}`;
    }
    for (const student of _students) {
      students[
        student.student_id
      ] = `${student.student_surname} ${student.student_name} ${student.student_patronymic}`;
    }
    return (
      <div className="container">
        <main>
          <a href="/" className="btn btn-secondary mb-2">
            Назад
          </a>
          <Table className="text-center">
            <thead>
              <tr>
                <th className="align-middle">Студент</th>
                <th className="align-middle">Дисциплина</th>
                <th className="align-middle">Преподаватель</th>
                <th className="align-middle">Тема курсовой</th>
                <th className="align-middle">Действие</th>
              </tr>
            </thead>
            <tbody>
              {courseworks.map((coursework) => (
                <tr key={`${coursework.course_id}-${coursework.student_id}`}>
                  <td className="align-middle">{`${coursework.student_surname} ${coursework.student_name} ${coursework.student_patronymic}`}</td>
                  <td className="align-middle">{`${coursework.discipline_name}`}</td>
                  <td className="align-middle">{`${coursework.teacher_surname} ${coursework.teacher_name} ${coursework.teacher_patronymic}`}</td>
                  <td className="align-middle">{`${coursework.coursework_theme}`}</td>
                  <td className="align-middle">
                    <Button
                      color="danger"
                      onClick={async () => {
                        const res = await axios.delete(
                          `api/db/courseworks?student_id=${coursework.student_id}&course_id=${coursework.course_id}`
                        );
                        if (res.data.success) {
                          const result = await axios("/api/db/courseworks");
                          setCourseworks(result.data);
                        } else {
                          alert(res.data.error);
                          const result = await axios("/api/db/courseworks");
                          setCourseworks(result.data);
                        }
                      }}
                    >
                      <i className="fa fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <Input
                    type="select"
                    value={student_id}
                    onChange={(e) => setStudent_id(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      Студент
                    </option>
                    {Object.keys(students).map((student_id) => (
                      <option value={student_id} key={student_id}>
                        {students[student_id]}
                      </option>
                    ))}
                  </Input>
                </td>
                <td colSpan="2">
                  <Input
                    type="select"
                    value={course_id}
                    onChange={(e) => setCourse_id(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      Дисциплина преподавателя
                    </option>
                    {Object.keys(courses).map((course_id) => (
                      <option value={course_id} key={course_id}>
                        {courses[course_id]}
                      </option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Input
                    placeholder="Тема курсовой"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    required
                    minLength={6}
                    maxLength={500}
                  />
                </td>
                <td>
                  <Button color="success" form="add_form">
                    <i className="fa fa-plus" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <form
            method="GET"
            id="add_form"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!course_id || !student_id || !theme) {
                alert("Пожалуйста, заполните все поля!");
                return;
              }
              const res = await axios.put("/api/db/courseworks", {
                course_id,
                student_id,
                coursework_theme: theme,
              });

              if (!res.data.success) {
                alert(
                  "Произошла непредвиденная ошибка(возможно у студента уже есть курсовая по этому предмету)"
                );
              }
              const result = await axios("/api/db/courseworks");
              setCourseworks(result.data);
            }}
          ></form>
        </main>
      </div>
    );
  }
}
