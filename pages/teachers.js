import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Teachers() {
  const [teachers, setTeachers] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  useEffect(async () => {
    const result = await axios("/api/db/teachers");
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
                <th className="align-middle">Фамили</th>
                <th className="align-middle">Имя</th>
                <th className="align-middle">Отчество</th>
                <th className="align-middle">Действие</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.teacher_id}>
                  <td className="align-middle">{teacher.teacher_id}</td>
                  <td className="align-middle">{teacher.teacher_surname}</td>
                  <td className="align-middle">{teacher.teacher_name}</td>
                  <td className="align-middle">{teacher.teacher_patronymic}</td>
                  <td className="align-middle">
                    <Button
                      color="danger"
                      onClick={async () => {
                        const res = await axios.delete(
                          "api/db/teachers?teacher_id=" + teacher.teacher_id
                        );
                        if (res.data.success) {
                          const result = await axios("/api/db/teachers");
                          setTeachers(result.data);
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
              await axios.put("/api/db/teachers", {
                name,
                surname,
                patronymic,
              });
              const result = await axios("/api/db/teachers");
              setTeachers(result.data);
            }}
          ></form>
        </main>
      </div>
    );
  }
}
