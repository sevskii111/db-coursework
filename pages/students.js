import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Students() {
  const [students, setStudents] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  useEffect(async () => {
    const result = await axios("/api/db/students");
    setStudents(result.data);
  }, []);

  if (students === null) {
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
                <th className="align-middle">Фамили</th>
                <th className="align-middle">Имя</th>
                <th className="align-middle">Отчество</th>
                <th className="align-middle">Действие</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td className="align-middle">{student.student_id}</td>
                  <td className="align-middle">{student.student_surname}</td>
                  <td className="align-middle">{student.student_name}</td>
                  <td className="align-middle">{student.student_patronymic}</td>
                  <td className="align-middle">
                    <Button
                      color="danger"
                      onClick={async () => {
                        const res = await axios.delete(
                          "api/db/students?student_id=" + student.student_id
                        );
                        if (res.data.success) {
                          const result = await axios("/api/db/students");
                          setStudents(result.data);
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
                    placeholder="Фамилия"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    minLength={2}
                    maxLength={50}
                    required
                    form="add_form"
                  ></Input>
                </td>
                <td>
                  <Input
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    minLength={2}
                    maxLength={50}
                    required
                    form="add_form"
                  ></Input>
                </td>
                <td>
                  <Input
                    placeholder="Отчество"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    minLength={2}
                    maxLength={50}
                    required
                    form="add_form"
                  ></Input>
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
              await axios.put("/api/db/students", {
                name,
                surname,
                patronymic,
              });
              const result = await axios("/api/db/students");
              setStudents(result.data);
            }}
          ></form>
        </main>
      </div>
    );
  }
}
