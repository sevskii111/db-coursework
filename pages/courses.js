import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Desciplines() {
  const [courses, setCourses] = useState(null);
  const [_disciplines, setDisciplines] = useState(null);
  const [_teachers, setTeachers] = useState(null);
  const [discipline_id, setDiscipline_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");
  useEffect(async () => {
    const [courses, disciplines, teachers] = await Promise.all([
      axios("/api/db/courses"),
      axios("/api/db/disciplines"),
      axios("/api/db/teachers"),
    ]);
    setCourses(courses.data);
    setDisciplines(disciplines.data);
    setTeachers(teachers.data);
  }, []);

  if (courses === null || _disciplines === null || _teachers == null) {
    return (
      <div className="container">
        <main>Loading...</main>
      </div>
    );
  } else {
    let disciplines = {};
    let teachers = {};
    for (const discipline of _disciplines) {
      disciplines[discipline.discipline_id] = `${discipline.discipline_name}`;
    }
    for (const teacher of _teachers) {
      teachers[
        teacher.teacher_id
      ] = `${teacher.teacher_surname} ${teacher.teacher_name} ${teacher.teacher_patronymic}`;
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
                <th className="align-middle">ID</th>
                <th className="align-middle">Дисциплина</th>
                <th className="align-middle">Преподаватель</th>
                <th className="align-middle">Действие</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.course_id}>
                  <td className="align-middle">{course.course_id}</td>
                  <td className="align-middle">{`${course.discipline_name}`}</td>
                  <td className="align-middle">{`${course.teacher_surname} ${course.teacher_name} ${course.teacher_patronymic}`}</td>
                  <td className="align-middle">
                    <Button
                      color="danger"
                      onClick={async () => {
                        const res = await axios.delete(
                          "api/db/courses?course_id=" + course.course_id
                        );
                        if (res.data.success) {
                          const result = await axios("/api/db/courses");
                          setCourses(result.data);
                        } else {
                          alert(res.data.error);
                        }
                      }}
                    >
                      <i className="fa fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>
                  <Input
                    type="select"
                    value={discipline_id}
                    onChange={(e) => setDiscipline_id(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      Дисциплина
                    </option>
                    {Object.keys(disciplines).map((discipline_id) => (
                      <option value={discipline_id} key={discipline_id}>
                        {disciplines[discipline_id]}
                      </option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Input
                    type="select"
                    value={teacher_id}
                    onChange={(e) => setTeacher_id(e.target.value)}
                    required
                  >
                    <option disabled value="">
                      Преподаватель
                    </option>
                    {Object.keys(teachers).map((teacher_id) => (
                      <option value={teacher_id} key={teacher_id}>
                        {teachers[teacher_id]}
                      </option>
                    ))}
                  </Input>
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
              await axios.put("/api/db/courses", {
                discipline_id,
                teacher_id,
              });
              const result = await axios("/api/db/courses");
              setCourses(result.data);
            }}
          ></form>
        </main>
      </div>
    );
  }
}
