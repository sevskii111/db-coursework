import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";
//disciplines
export default function Desciplines() {
  const [disciplines, setDisciplines] = useState(null);
  const [name, setName] = useState("");
  useEffect(async () => {
    const result = await axios("/api/db/disciplines");
    setDisciplines(result.data);
  }, []);

  if (disciplines === null) {
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
                <th className="align-middle">Название</th>
                <th className="align-middle">Действие</th>
              </tr>
            </thead>
            <tbody>
              {disciplines.map((discipline) => (
                <tr key={discipline.discipline_id}>
                  <td className="align-middle">{discipline.discipline_id}</td>
                  <td className="align-middle">{discipline.discipline_name}</td>
                  <td className="align-middle">
                    <Button
                      color="danger"
                      onClick={async () => {
                        const res = await axios.delete(
                          "api/db/disciplines?discipline_id=" +
                            discipline.discipline_id
                        );
                        if (res.data.success) {
                          const result = await axios("/api/db/disciplines");
                          setDisciplines(result.data);
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
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              await axios.put("/api/db/disciplines", {
                name,
              });
              const result = await axios("/api/db/disciplines");
              setDisciplines(result.data);
            }}
          ></form>
        </main>
      </div>
    );
  }
}
