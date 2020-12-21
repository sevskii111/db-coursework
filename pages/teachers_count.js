import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Teachers() {
  const [teachers, setTeachers] = useState(null);
  useEffect(async () => {
    const result = await axios("/api/db/teachers_count");
    setTeachers(result.data);
  }, []);

  if (teachers === null) {
    return (
      <div className="container">
        <main>Loading...</main>
      </div>
    );
  } else {
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
                <th className="align-middle">ФИО</th>
                <th className="align-middle">Колличетво дисциплин</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.teacher_id}>
                  <td className="align-middle">{teacher.teacher_id}</td>
                  <td className="align-middle">{`${teacher.teacher_surname} ${teacher.teacher_name} ${teacher.teacher_patronymic}`}</td>
                  <td className="align-middle">{teacher.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
      </div>
    );
  }
}
